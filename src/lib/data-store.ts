import { randomUUID } from 'crypto'
import type { GuestListDocument, RSVPSubmission } from '@/interfaces/guest'
import { config } from '@/config'
import { DEMO_GUESTS, resolveDemoGuest } from '@/data/demo-guests'
import { DEMO_SEED_RSVPS } from '@/data/demo-rsvps'

/**
 * Application data access for guests + RSVPs.
 *
 * Demo mode (default): in-repo fictional data only — no Cosmos, no real PII.
 * Non-demo mode: Azure Cosmos DB (requires COSMOS_* env vars).
 */

// --- Demo in-memory RSVP store (seeded + runtime submissions) ---
// Module-level state is fine for local demos and short-lived serverless instances.
// Seeded entries make the Songs page useful out of the box.

const demoRsvpByGuestId = new Map<string, RSVPSubmission>()

function ensureDemoSeeded() {
  if (demoRsvpByGuestId.size > 0) return
  for (const rsvp of DEMO_SEED_RSVPS) {
    demoRsvpByGuestId.set(rsvp.guestId, { ...rsvp })
  }
}

function normalizeGuestId(id: string): string {
  return id.trim().toUpperCase()
}

// --- Cosmos lazy load (only when not in demo mode) ---

type CosmosModule = typeof import('@/lib/cosmos')

let cosmosModulePromise: Promise<CosmosModule> | null = null

async function getCosmos(): Promise<CosmosModule> {
  if (config.demoMode) {
    throw new Error('Cosmos is not used in demo mode')
  }
  if (!config.cosmos) {
    throw new Error(
      'Cosmos is not configured. Set COSMOS_* env vars or keep DEMO_MODE enabled.',
    )
  }
  if (!cosmosModulePromise) {
    cosmosModulePromise = import('@/lib/cosmos')
  }
  return cosmosModulePromise
}

// --- Public API ---

export async function getGuestById(
  id: string,
): Promise<GuestListDocument | null> {
  const normalized = normalizeGuestId(id)

  if (config.demoMode) {
    // Any valid 6-char code works: curated samples first, else synthetic party.
    return resolveDemoGuest(normalized)
  }

  const cosmos = await getCosmos()
  return cosmos.getGuestById(normalized)
}

export async function getExistingRSVP(
  guestId: string,
): Promise<RSVPSubmission | null> {
  const normalized = normalizeGuestId(guestId)

  if (config.demoMode) {
    ensureDemoSeeded()
    return demoRsvpByGuestId.get(normalized) ?? null
  }

  const cosmos = await getCosmos()
  return cosmos.getExistingRSVP(normalized)
}

export async function saveRSVPSubmission(
  rsvpData: RSVPSubmission,
): Promise<RSVPSubmission | null> {
  if (config.demoMode) {
    ensureDemoSeeded()
    const guestId = normalizeGuestId(rsvpData.guestId)
    const saved: RSVPSubmission = {
      ...rsvpData,
      id: rsvpData.id || randomUUID(),
      guestId,
      rsvpId: normalizeGuestId(rsvpData.rsvpId),
      group: rsvpData.group ?? 'Demo',
      submittedAt: rsvpData.submittedAt || new Date().toISOString(),
    }
    demoRsvpByGuestId.set(guestId, saved)
    return saved
  }

  const cosmos = await getCosmos()
  const saved = await cosmos.saveRSVPSubmission(rsvpData)
  return (saved as RSVPSubmission | undefined) ?? null
}

export async function getAllGuests(): Promise<GuestListDocument[]> {
  if (config.demoMode) {
    return [...DEMO_GUESTS]
  }

  const cosmos = await getCosmos()
  const { resources } = await cosmos.guestsContainer.items
    .query('SELECT * FROM c')
    .fetchAll()
  return resources as GuestListDocument[]
}

export async function getAllRSVPs(): Promise<RSVPSubmission[]> {
  if (config.demoMode) {
    ensureDemoSeeded()
    return Array.from(demoRsvpByGuestId.values())
  }

  const cosmos = await getCosmos()
  const { resources } = await cosmos.rsvpsContainer.items
    .query('SELECT * FROM c')
    .fetchAll()
  return resources as RSVPSubmission[]
}

export type SongEntry = { text: string; url?: string }
export type GuestSongs = { name: string; songs: SongEntry[] }

function isYouTubeUrl(text: string): boolean {
  return text.includes('youtube.com') || text.includes('youtu.be')
}

/** Shared song aggregation for /songs page and /api/songs. */
export async function getSongRequestData(): Promise<{
  guests: GuestSongs[]
  totalGuests: number
  totalSongs: number
}> {
  const [rsvps, guests] = await Promise.all([getAllRSVPs(), getAllGuests()])

  const guestMap: Record<string, { names: string }> = {}
  for (const g of guests) {
    guestMap[g.id] = { names: g.names }
  }

  const seenGuestIds = new Set<string>()
  const guestSongs: GuestSongs[] = []

  for (const rsvp of rsvps) {
    if (!rsvp.additionalNotes?.trim()) continue
    if (rsvp.additionalNotes.includes('Same song requests')) continue
    if (seenGuestIds.has(rsvp.guestId)) continue
    seenGuestIds.add(rsvp.guestId)

    const name =
      rsvp.submittedBy || guestMap[rsvp.guestId]?.names || 'Unknown Guest'

    const songs: SongEntry[] = []
    for (const line of rsvp.additionalNotes.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed) continue
      if (trimmed.includes('These are all links')) continue

      if (isYouTubeUrl(trimmed)) {
        songs.push({ text: trimmed, url: trimmed })
      } else {
        songs.push({ text: trimmed })
      }
    }

    if (songs.length > 0) {
      guestSongs.push({ name, songs })
    }
  }

  const totalSongs = guestSongs.reduce((sum, g) => sum + g.songs.length, 0)
  return {
    guests: guestSongs,
    totalGuests: guestSongs.length,
    totalSongs,
  }
}
