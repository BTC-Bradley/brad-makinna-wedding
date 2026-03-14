import { Metadata } from 'next'
import { guestsContainer, rsvpsContainer } from '@/lib/cosmos'
import type { GuestListDocument, RSVPSubmission } from '@/interfaces/guest'
import StatsCountdown from '@/components/StatsCountdown'

export const metadata: Metadata = {
  title: 'RSVP Stats | Bradley & MaKinna',
  description: 'Live RSVP stats for the wedding.',
  openGraph: {
    title: 'RSVP Stats | Bradley & MaKinna',
    description: 'Live RSVP stats for the Bradley & MaKinna wedding.',
    type: 'website',
  },
}

// Don't cache — always live
export const dynamic = 'force-dynamic'

interface StateStat {
  state: string
  count: number
  cities: string[]
  attendingCount: number
}

interface GeoStats {
  byState: StateStat[]
  international: { country: string; names: string; city: string }[]
  farthestTraveler: { names: string; location: string } | null
  unknownLocation: number
}

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

  // Geo
  geo: GeoStats
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
        'SELECT c.id, c.names, c.guestCount, c.outOfTown, c.group, c.address FROM c',
      )
      .fetchAll(),
    rsvpsContainer.items.query('SELECT * FROM c').fetchAll(),
  ])

  const guests = guestResult.resources as Pick<
    GuestListDocument,
    'id' | 'names' | 'guestCount' | 'outOfTown' | 'group' | 'address'
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

  // --- Geo aggregation ---
  // We consider "home state" = WA (Brad & MaKinna are in Lake Stevens, WA)
  const HOME_STATE = 'WA'
  const stateMap = new Map<string, { count: number; cities: Set<string>; attendingCount: number }>()
  const international: { country: string; names: string; city: string }[] = []
  let unknownLocation = 0

  for (const guest of guests) {
    const addr = guest.address
    if (!addr) { unknownLocation++; continue }

    const country = (addr.country || '').trim()
    const state = (addr.stateProvince || '').trim()
    const city = (addr.city || '').trim()

    // International: has country and it's not USA variants
    const isUSA = !country || ['US', 'USA', 'United States', 'United States of America'].includes(country)
    if (!isUSA) {
      international.push({ country, names: guest.names, city })
      continue
    }

    if (!state && !city) { unknownLocation++; continue }

    const key = state || city
    if (!stateMap.has(key)) {
      stateMap.set(key, { count: 0, cities: new Set(), attendingCount: 0 })
    }
    const entry = stateMap.get(key)!
    entry.count++
    if (city) entry.cities.add(city)

    const rsvp = rsvpByGuestId.get(guest.id)
    if (rsvp?.attending) entry.attendingCount++
  }

  const byState: StateStat[] = Array.from(stateMap.entries())
    .map(([state, { count, cities, attendingCount }]) => ({
      state,
      count,
      cities: Array.from(cities).sort(),
      attendingCount,
    }))
    .sort((a, b) => {
      // Home state last (or first — let's put WA first since it'll be biggest)
      if (a.state === HOME_STATE) return -1
      if (b.state === HOME_STATE) return 1
      return b.count - a.count
    })

  // Farthest traveler: pick first international guest, else most distant state heuristic
  let farthestTraveler: { names: string; location: string } | null = null
  if (international.length > 0) {
    const g = international[0]
    farthestTraveler = {
      names: g.names,
      location: g.city ? `${g.city}, ${g.country}` : g.country,
    }
  }

  const geo: GeoStats = {
    byState,
    international,
    farthestTraveler,
    unknownLocation,
  }

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
    geo,
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

      {/* Countdown to the Wedding */}
      <div className="mb-10">
        <h2 className="text-sage mb-2 font-serif text-2xl font-light dark:text-amber-400">
          Countdown
        </h2>
        <p className="mb-6 text-sm text-gray-400 dark:text-gray-500">
          July 11, 2026 · The big day ✨
        </p>
        <div className="rounded-2xl border border-sage/20 bg-white p-8 shadow-sm dark:border-amber-400/20 dark:bg-zinc-800">
          <StatsCountdown />
        </div>
      </div>

      {/* Guest Map / Origin Breakdown */}
      <div className="mb-10">
        <h2 className="text-sage mb-2 font-serif text-2xl font-light dark:text-amber-400">
          Where Our Guests Are Coming From
        </h2>
        <p className="mb-6 text-sm text-gray-400 dark:text-gray-500">
          {stats.geo.byState.length} state{stats.geo.byState.length !== 1 ? 's' : ''} represented
          {stats.geo.international.length > 0 && ` + ${stats.geo.international.length} international`}
        </p>

        {/* State breakdown */}
        {stats.geo.byState.length > 0 && (
          <div className="mb-6 rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left dark:border-zinc-700">
                  <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">
                    State / Region
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400">
                    Invited
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400">
                    Attending
                  </th>
                  <th className="hidden px-4 py-3 text-left font-medium text-gray-500 sm:table-cell dark:text-gray-400">
                    Cities
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-zinc-700/50">
                {stats.geo.byState.map((s) => (
                  <tr key={s.state}>
                    <td className="px-6 py-3 font-medium text-gray-700 dark:text-gray-200">
                      {s.state}
                      {s.state === 'WA' && (
                        <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">
                          (home)
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300">
                      {s.count}
                    </td>
                    <td className="text-sage px-4 py-3 text-right font-medium dark:text-amber-400">
                      {s.attendingCount}
                    </td>
                    <td className="hidden px-4 py-3 text-xs text-gray-400 sm:table-cell dark:text-gray-500">
                      {s.cities.slice(0, 5).join(', ')}
                      {s.cities.length > 5 && ` +${s.cities.length - 5} more`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Out-of-town stat */}
        <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <StatCard
            label="Out-of-Town Invited"
            value={stats.outOfTown}
            sub={`${stats.outOfTownAttending} confirmed attending`}
            emoji="✈️"
          />
          <StatCard
            label="States Represented"
            value={stats.geo.byState.length}
            emoji="🗺️"
          />
          {stats.geo.international.length > 0 && (
            <StatCard
              label="International Guests"
              value={stats.geo.international.length}
              accent
              emoji="🌍"
            />
          )}
        </div>

        {/* Farthest traveler */}
        {stats.geo.farthestTraveler && (
          <div className="rounded-2xl border border-amber-200/60 bg-amber-50/50 p-6 dark:border-amber-400/20 dark:bg-amber-400/5">
            <div className="mb-1 text-2xl">🏆</div>
            <div className="text-sm font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
              Farthest Traveler
            </div>
            <div className="mt-1 font-serif text-xl font-light text-gray-800 dark:text-gray-100">
              {stats.geo.farthestTraveler.names}
            </div>
            <div className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
              Traveling from {stats.geo.farthestTraveler.location}
            </div>
          </div>
        )}

        {/* International guests list */}
        {stats.geo.international.length > 0 && (
          <div className="mt-4 rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
            <div className="border-b border-gray-100 px-6 py-4 dark:border-zinc-700">
              <span className="text-sm font-medium text-gray-500 uppercase dark:text-gray-400">
                🌍 International Guests
              </span>
            </div>
            <ul className="divide-y divide-gray-50 dark:divide-zinc-700/50">
              {stats.geo.international.map((g, i) => (
                <li key={i} className="flex items-center justify-between px-6 py-3">
                  <span className="font-serif text-sm text-gray-700 dark:text-gray-200">
                    {g.names}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {g.city ? `${g.city}, ` : ''}{g.country}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-gray-400 dark:text-gray-600">
        Internal page · Data updates on each page load · Not linked in nav
      </p>
    </div>
  )
}
