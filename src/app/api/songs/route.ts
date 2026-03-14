import { NextResponse } from 'next/server'
import { guestsContainer, rsvpsContainer } from '@/lib/cosmos'

function isYouTubeUrl(text: string): boolean {
  return text.includes('youtube.com') || text.includes('youtu.be')
}

export async function GET() {
  try {
    const [rsvpResult, guestResult] = await Promise.all([
      rsvpsContainer.items.query('SELECT * FROM c').fetchAll(),
      guestsContainer.items
        .query('SELECT c.id, c.names FROM c')
        .fetchAll(),
    ])

    const rsvps = rsvpResult.resources
    const guests = guestResult.resources

    const guestMap: Record<string, { names: string }> = {}
    for (const g of guests) {
      guestMap[g.id] = { names: g.names }
    }

    const seenGuestIds = new Set<string>()
    const guestSongs: { name: string; songs: { text: string; url?: string }[] }[] = []

    for (const rsvp of rsvps) {
      if (!rsvp.additionalNotes?.trim()) continue
      if (rsvp.additionalNotes.includes('Same song requests')) continue
      if (seenGuestIds.has(rsvp.guestId)) continue
      seenGuestIds.add(rsvp.guestId)

      const name =
        rsvp.submittedBy ||
        guestMap[rsvp.guestId]?.names ||
        'Unknown Guest'

      const songs: { text: string; url?: string }[] = []

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

    return NextResponse.json({
      guests: guestSongs,
      totalGuests: guestSongs.length,
      totalSongs,
    })
  } catch (error) {
    console.error('Error fetching song requests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch song requests' },
      { status: 500 },
    )
  }
}
