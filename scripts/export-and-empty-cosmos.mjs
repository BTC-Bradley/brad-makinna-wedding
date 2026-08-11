/**
 * One-shot: export wedding Cosmos data to a private local backup, then empty containers.
 *
 * Usage:
 *   node scripts/export-and-empty-cosmos.mjs            # export only
 *   node scripts/export-and-empty-cosmos.mjs --empty     # export, then delete all docs
 *
 * Reads .env.local from repo root. Never prints PII.
 */
import { CosmosClient } from '@azure/cosmos'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const shouldEmpty = process.argv.includes('--empty')

function loadEnv(filePath) {
  const text = fs.readFileSync(filePath, 'utf8')
  const env = {}
  for (const line of text.split(/\r?\n/)) {
    if (!line || line.startsWith('#')) continue
    const i = line.indexOf('=')
    if (i === -1) continue
    env[line.slice(0, i).trim()] = line.slice(i + 1).trim()
  }
  return env
}

/**
 * Both wedding containers are partitioned on /group.
 * Guests usually have a string group; RSVPs often have group: null/missing.
 * Cosmos accepts null for a null/undefined partition-key value.
 */
function partitionKeyCandidates(doc) {
  const candidates = []
  if (Object.prototype.hasOwnProperty.call(doc, 'group')) {
    candidates.push(doc.group) // may be string, "", or null
  }
  candidates.push(undefined, null, doc.id, doc.rsvpId, doc.guestId)
  // de-dupe while preserving order (including null/undefined)
  const seen = new Set()
  const unique = []
  for (const c of candidates) {
    const key = c === undefined ? '__undefined__' : c === null ? '__null__' : `v:${c}`
    if (seen.has(key)) continue
    seen.add(key)
    unique.push(c)
  }
  return unique
}

async function fetchAll(container) {
  const { resources } = await container.items.query('SELECT * FROM c').fetchAll()
  return resources
}

async function deleteAll(container, label) {
  const docs = await fetchAll(container)
  let ok = 0
  let fail = 0
  for (const doc of docs) {
    let deleted = false
    let lastErr
    for (const pk of partitionKeyCandidates(doc)) {
      try {
        await container.item(doc.id, pk).delete()
        deleted = true
        break
      } catch (err) {
        lastErr = err
      }
    }
    if (deleted) {
      ok++
    } else {
      fail++
      console.error(
        `Failed to delete ${label} id=${doc.id}: ${lastErr?.message || lastErr}`,
      )
    }
  }
  return { attempted: docs.length, ok, fail }
}

async function main() {
  const envPath = path.join(root, '.env.local')
  if (!fs.existsSync(envPath)) {
    throw new Error(`Missing ${envPath}`)
  }
  const env = loadEnv(envPath)
  const required = [
    'COSMOS_CONNECTION_STRING',
    'COSMOS_DATABASE_NAME',
    'COSMOS_CONTAINER_NAME',
    'COSMOS_RSVPS_CONTAINER_NAME',
  ]
  for (const key of required) {
    if (!env[key]) throw new Error(`Missing env ${key}`)
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  const outDir = path.join(
    'D:\\dev\\_private-wedding-backup',
    `export-${stamp}`,
  )
  fs.mkdirSync(outDir, { recursive: true })

  const client = new CosmosClient(env.COSMOS_CONNECTION_STRING)
  const db = client.database(env.COSMOS_DATABASE_NAME)
  const guestsC = db.container(env.COSMOS_CONTAINER_NAME)
  const rsvpsC = db.container(env.COSMOS_RSVPS_CONTAINER_NAME)

  console.log('Fetching documents from Cosmos...')
  const [guests, rsvps] = await Promise.all([
    fetchAll(guestsC),
    fetchAll(rsvpsC),
  ])

  const meta = {
    exportedAt: new Date().toISOString(),
    source: {
      account: 'bradley-makinna',
      database: env.COSMOS_DATABASE_NAME,
      guestsContainer: env.COSMOS_CONTAINER_NAME,
      rsvpsContainer: env.COSMOS_RSVPS_CONTAINER_NAME,
    },
    counts: { guests: guests.length, rsvps: rsvps.length },
    warning:
      'PRIVATE — contains PII (names, emails, phones, addresses). Do not commit or share.',
  }

  fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(meta, null, 2))
  fs.writeFileSync(path.join(outDir, 'guests.json'), JSON.stringify(guests, null, 2))
  fs.writeFileSync(path.join(outDir, 'rsvps.json'), JSON.stringify(rsvps, null, 2))

  const guestSummary = guests.map((g) => ({
    id: g.id,
    rsvpId: g.rsvpId,
    guestCount: g.guestCount,
    hasEmail: !!g.email,
    hasPhone: !!g.phone,
    hasAddress: !!g.address,
  }))
  const rsvpSummary = rsvps.map((r) => ({
    id: r.id,
    guestId: r.guestId,
    rsvpId: r.rsvpId,
    attending: r.attending,
    attendingGuestsCount: Array.isArray(r.attendingGuests)
      ? r.attendingGuests.length
      : 0,
    submittedAt: r.submittedAt,
    hasDietary: !!r.dietaryRestrictions,
    hasNotes: !!r.additionalNotes,
  }))
  fs.writeFileSync(
    path.join(outDir, 'guests-summary-no-pii.json'),
    JSON.stringify(guestSummary, null, 2),
  )
  fs.writeFileSync(
    path.join(outDir, 'rsvps-summary-no-pii.json'),
    JSON.stringify(rsvpSummary, null, 2),
  )
  fs.writeFileSync(
    path.join(outDir, 'README.txt'),
    [
      'PRIVATE WEDDING DATA BACKUP',
      '===========================',
      `Exported: ${meta.exportedAt}`,
      'Source: Cosmos account bradley-makinna / database wedding',
      '',
      'Files:',
      '  guests.json  — full guest list (PII: names, email, phone, address)',
      '  rsvps.json   — full RSVP submissions (attendance, dietary, notes)',
      '  manifest.json',
      '  *-summary-no-pii.json — ids/flags only',
      '',
      'DO NOT commit this folder to git.',
      'DO NOT upload to public cloud storage.',
      'Keep offline or in encrypted personal storage only.',
      '',
      'After Cosmos was emptied, this is the recovery copy of real wedding data.',
      '',
    ].join('\n'),
  )

  const guestsBytes = fs.statSync(path.join(outDir, 'guests.json')).size
  const rsvpsBytes = fs.statSync(path.join(outDir, 'rsvps.json')).size

  console.log(
    JSON.stringify(
      {
        phase: 'export',
        outDir,
        guests: guests.length,
        rsvps: rsvps.length,
        guestsBytes,
        rsvpsBytes,
        files: fs.readdirSync(outDir),
      },
      null,
      2,
    ),
  )

  if (guests.length !== 141 || rsvps.length !== 100) {
    console.warn(
      `WARNING: unexpected counts (expected guests=141 rsvps=100, got guests=${guests.length} rsvps=${rsvps.length}). Continuing with actual counts.`,
    )
  }

  if (!shouldEmpty) {
    console.log('Export complete. Re-run with --empty to delete Cosmos documents.')
    return
  }

  if (guests.length === 0 && rsvps.length === 0) {
    console.log('Containers already empty; nothing to delete.')
    return
  }

  console.log('Deleting all documents from Cosmos...')
  const guestDel = await deleteAll(guestsC, 'guest')
  const rsvpDel = await deleteAll(rsvpsC, 'rsvp')

  const [guestsAfter, rsvpsAfter] = await Promise.all([
    guestsC.items.query('SELECT VALUE COUNT(1) FROM c').fetchAll(),
    rsvpsC.items.query('SELECT VALUE COUNT(1) FROM c').fetchAll(),
  ])

  console.log(
    JSON.stringify(
      {
        phase: 'empty',
        guestDeletes: guestDel,
        rsvpDeletes: rsvpDel,
        remaining: {
          guests: guestsAfter.resources[0],
          rsvps: rsvpsAfter.resources[0],
        },
        backup: outDir,
      },
      null,
      2,
    ),
  )

  if (guestsAfter.resources[0] !== 0 || rsvpsAfter.resources[0] !== 0) {
    process.exitCode = 2
    console.error('ERROR: containers not empty after delete pass.')
  } else {
    console.log('SUCCESS: Cosmos guests + rsvps containers are empty.')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
