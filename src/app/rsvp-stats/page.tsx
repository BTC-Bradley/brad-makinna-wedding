import { Metadata } from 'next'
import { guestsContainer, rsvpsContainer } from '@/lib/cosmos'
import type { GuestListDocument, RSVPSubmission } from '@/interfaces/guest'

export const metadata: Metadata = {
  title: 'RSVP Stats | Bradley & MaKinna',
  description: 'Live RSVP stats for the wedding.',
}

// Don't cache — always live
export const dynamic = 'force-dynamic'

interface RSVPStats {
  // Invitations
  totalInvited: number
  totalGuestCount: number // sum of guestCount fields
  rsvpSubmitted: number
  attending: number
  declining: number
  noResponse: number

  // Headcount
  attendingHeadcount: number // from attendingGuests arrays
  outOfTown: number
  outOfTownAttending: number

  // Dietary
  dietaryResponses: DietaryEntry[]
  dietaryCount: number

  // Fun stats
  songRequests: number
  additionalNotesCount: number

  // Guest group breakdown
  groups: GroupStat[]
}

interface DietaryEntry {
  guestId: string
  guestName: string
  restriction: string
}

interface GroupStat {
  group: string
  invited: number
  attending: number
  declining: number
}

async function getStats(): Promise<RSVPStats> {
  const [guestResult, rsvpResult] = await Promise.all([
    guestsContainer.items
      .query(
        'SELECT c.id, c.names, c.guestCount, c.outOfTown, c.group FROM c',
      )
      .fetchAll(),
    rsvpsContainer.items.query('SELECT * FROM c').fetchAll(),
  ])

  const guests = guestResult.resources as Pick<
    GuestListDocument,
    'id' | 'names' | 'guestCount' | 'outOfTown' | 'group'
  >[]
  const rsvps = rsvpResult.resources as RSVPSubmission[]

  // Build lookup maps
  const guestMap = new Map(guests.map((g) => [g.id, g]))
  const rsvpByGuestId = new Map<string, RSVPSubmission>()
  for (const rsvp of rsvps) {
    // Keep only latest per guestId if dupes exist
    if (!rsvpByGuestId.has(rsvp.guestId)) {
      rsvpByGuestId.set(rsvp.guestId, rsvp)
    }
  }

  const totalInvited = guests.length
  const totalGuestCount = guests.reduce((s, g) => s + (g.guestCount || 1), 0)
  const outOfTown = guests.filter(
    (g) => g.outOfTown?.toLowerCase() === 'yes',
  ).length

  let attending = 0
  let declining = 0
  let attendingHeadcount = 0
  let outOfTownAttending = 0
  let dietaryCount = 0
  let songRequests = 0
  let additionalNotesCount = 0

  const dietaryResponses: DietaryEntry[] = []
  const groupMap = new Map<string, GroupStat>()

  // Seed group stats from guest list
  for (const g of guests) {
    const grp = g.group || 'Ungrouped'
    if (!groupMap.has(grp)) {
      groupMap.set(grp, { group: grp, invited: 0, attending: 0, declining: 0 })
    }
    groupMap.get(grp)!.invited++
  }

  for (const guest of guests) {
    const rsvp = rsvpByGuestId.get(guest.id)
    const grp = guest.group || 'Ungrouped'
    const groupStat = groupMap.get(grp)!

    if (!rsvp) continue

    if (rsvp.attending) {
      attending++
      groupStat.attending++
      const headcount = rsvp.attendingGuests?.length ?? guest.guestCount ?? 1
      attendingHeadcount += headcount
      if (guest.outOfTown?.toLowerCase() === 'yes') {
        outOfTownAttending++
      }
    } else {
      declining++
      groupStat.declining++
    }

    if (rsvp.dietaryRestrictions?.trim()) {
      dietaryCount++
      dietaryResponses.push({
        guestId: guest.id,
        guestName: guest.names,
        restriction: rsvp.dietaryRestrictions.trim(),
      })
    }

    if (rsvp.additionalNotes?.trim()) {
      additionalNotesCount++
      // Song requests live in additionalNotes (lines that aren't boilerplate)
      const lines = rsvp.additionalNotes
        .split('\n')
        .map((l) => l.trim())
        .filter(
          (l) =>
            l.length > 0 &&
            !l.includes('Same song requests') &&
            !l.includes('These are all links'),
        )
      if (lines.length > 0) songRequests++
    }
  }

  const noResponse = totalInvited - attending - declining
  const groups = Array.from(groupMap.values()).sort(
    (a, b) => b.invited - a.invited,
  )

  return {
    totalInvited,
    totalGuestCount,
    rsvpSubmitted: attending + declining,
    attending,
    declining,
    noResponse,
    attendingHeadcount,
    outOfTown,
    outOfTownAttending,
    dietaryResponses,
    dietaryCount,
    songRequests,
    additionalNotesCount,
    groups,
  }
}

// Stat card component (server component inline)
function StatCard({
  label,
  value,
  sub,
  accent = false,
  emoji,
}: {
  label: string
  value: string | number
  sub?: string
  accent?: boolean
  emoji?: string
}) {
  return (
    <div
      className={`rounded-2xl border p-6 shadow-sm transition-shadow hover:shadow-md ${
        accent
          ? 'border-sage/40 bg-sage/10 dark:border-amber-400/30 dark:bg-amber-400/10'
          : 'border-gray-100 bg-white dark:border-zinc-700 dark:bg-zinc-800'
      }`}
    >
      {emoji && <div className="mb-2 text-2xl">{emoji}</div>}
      <div
        className={`font-serif text-4xl font-light ${
          accent
            ? 'text-sage dark:text-amber-400'
            : 'text-gray-800 dark:text-gray-100'
        }`}
      >
        {value}
      </div>
      <div className="mt-1 text-sm font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
        {label}
      </div>
      {sub && (
        <div className="mt-1 text-xs text-gray-400 dark:text-gray-500">
          {sub}
        </div>
      )}
    </div>
  )
}

function ResponseBar({
  attending,
  declining,
  noResponse,
  total,
}: {
  attending: number
  declining: number
  noResponse: number
  total: number
}) {
  const aPct = total > 0 ? (attending / total) * 100 : 0
  const dPct = total > 0 ? (declining / total) * 100 : 0
  const nPct = total > 0 ? (noResponse / total) * 100 : 0

  return (
    <div className="overflow-hidden rounded-full" style={{ height: 12 }}>
      <div className="flex h-full w-full">
        <div
          className="bg-sage dark:bg-amber-400"
          style={{ width: `${aPct}%` }}
          title={`Attending: ${attending}`}
        />
        <div
          className="bg-red-300 dark:bg-red-500"
          style={{ width: `${dPct}%` }}
          title={`Declining: ${declining}`}
        />
        <div
          className="bg-gray-200 dark:bg-zinc-600"
          style={{ width: `${nPct}%` }}
          title={`No response: ${noResponse}`}
        />
      </div>
    </div>
  )
}

export default async function RSVPStatsPage() {
  const stats = await getStats()
  const responsePct =
    stats.totalInvited > 0
      ? Math.round((stats.rsvpSubmitted / stats.totalInvited) * 100)
      : 0

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-sage mb-2 font-serif text-5xl font-light tracking-wide dark:text-amber-400">
          RSVP Stats
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Live snapshot · July 12, 2026
        </p>
        <div className="bg-sage/30 mx-auto mt-4 h-1 w-24 dark:bg-amber-400/30" />
      </div>

      {/* Response Rate Banner */}
      <div className="mb-10 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
        <div className="mb-3 flex items-end justify-between">
          <span className="text-sm font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
            Response Rate
          </span>
          <span className="text-sage font-serif text-3xl font-light dark:text-amber-400">
            {responsePct}%
          </span>
        </div>
        <ResponseBar
          attending={stats.attending}
          declining={stats.declining}
          noResponse={stats.noResponse}
          total={stats.totalInvited}
        />
        <div className="mt-3 flex gap-4 text-xs text-gray-400 dark:text-gray-500">
          <span className="flex items-center gap-1">
            <span className="bg-sage inline-block h-2.5 w-2.5 rounded-full dark:bg-amber-400" />
            Attending ({stats.attending})
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-300 dark:bg-red-500" />
            Declining ({stats.declining})
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-gray-200 dark:bg-zinc-600" />
            No Response ({stats.noResponse})
          </span>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatCard
          label="Invitations Sent"
          value={stats.totalInvited}
          sub={`${stats.totalGuestCount} total guests invited`}
          emoji="💌"
        />
        <StatCard
          label="Attending"
          value={stats.attending}
          sub={`${stats.attendingHeadcount} confirmed guests`}
          accent
          emoji="🎉"
        />
        <StatCard
          label="Declining"
          value={stats.declining}
          emoji="😢"
        />
        <StatCard
          label="No Response"
          value={stats.noResponse}
          emoji="⏳"
        />
        <StatCard
          label="Out of Town"
          value={stats.outOfTown}
          sub={`${stats.outOfTownAttending} confirmed attending`}
          emoji="✈️"
        />
        <StatCard
          label="Headcount"
          value={stats.attendingHeadcount}
          sub="confirmed guests attending"
          accent
          emoji="🪑"
        />
      </div>

      {/* Fun Stats */}
      <div className="mb-10">
        <h2 className="text-sage mb-4 font-serif text-2xl font-light dark:text-amber-400">
          Fun Stats
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            label="Song Requests"
            value={stats.songRequests}
            sub="parties submitted requests"
            emoji="🎵"
          />
          <StatCard
            label="Left a Note"
            value={stats.additionalNotesCount}
            sub="guests with extra notes"
            emoji="📝"
          />
        </div>
      </div>

      {/* Dietary Restrictions */}
      <div className="mb-10">
        <h2 className="text-sage mb-4 font-serif text-2xl font-light dark:text-amber-400">
          Dietary Restrictions
        </h2>
        {stats.dietaryCount === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center text-gray-400 dark:border-zinc-700 dark:bg-zinc-800">
            No dietary restrictions submitted yet.
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
            <div className="border-b border-gray-100 px-6 py-4 dark:border-zinc-700">
              <span className="text-sage font-serif text-lg dark:text-amber-400">
                {stats.dietaryCount}
              </span>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                {stats.dietaryCount === 1 ? 'party has' : 'parties have'} dietary
                restrictions
              </span>
            </div>
            <ul className="divide-y divide-gray-50 dark:divide-zinc-700/50">
              {stats.dietaryResponses.map((d) => (
                <li
                  key={d.guestId}
                  className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-start sm:gap-4"
                >
                  <span className="text-sage w-40 shrink-0 font-serif text-sm font-medium dark:text-amber-400">
                    {d.guestName}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {d.restriction}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Group Breakdown */}
      <div className="mb-10">
        <h2 className="text-sage mb-4 font-serif text-2xl font-light dark:text-amber-400">
          By Group
        </h2>
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left dark:border-zinc-700">
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">
                  Group
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400">
                  Invited
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400">
                  Attending
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400">
                  Declining
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400">
                  Pending
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-zinc-700/50">
              {stats.groups.map((g) => (
                <tr key={g.group}>
                  <td className="px-6 py-3 font-medium text-gray-700 dark:text-gray-200">
                    {g.group || 'Ungrouped'}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300">
                    {g.invited}
                  </td>
                  <td className="text-sage px-4 py-3 text-right font-medium dark:text-amber-400">
                    {g.attending}
                  </td>
                  <td className="px-4 py-3 text-right text-red-400 dark:text-red-400">
                    {g.declining}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-400 dark:text-gray-500">
                    {g.invited - g.attending - g.declining}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-gray-400 dark:text-gray-600">
        Internal page · Data updates on each page load · Not linked in nav
      </p>
    </div>
  )
}
