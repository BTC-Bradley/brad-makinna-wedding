import { randomUUID } from 'crypto'
import type { GuestListDocument, RSVPSubmission } from '@/interfaces/guest'
import { DEMO_GUESTS, resolveDemoGuest } from '@/data/demo-guests'
import { DEMO_SEED_RSVPS } from '@/data/demo-rsvps'

/**
 * Guest + RSVP access for the archive demo.
 * In-repo fictional data only — no Cosmos, no real PII.
 */

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

export async function getGuestById(
  id: string,
): Promise<GuestListDocument | null> {
  const normalized = normalizeGuestId(id)
  // Any valid 6-char code works: curated samples first, else synthetic party.
  return resolveDemoGuest(normalized)
}

export async function getExistingRSVP(
  guestId: string,
): Promise<RSVPSubmission | null> {
  const normalized = normalizeGuestId(guestId)
  ensureDemoSeeded()
  return demoRsvpByGuestId.get(normalized) ?? null
}

export async function saveRSVPSubmission(
  rsvpData: RSVPSubmission,
): Promise<RSVPSubmission | null> {
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

export async function getAllGuests(): Promise<GuestListDocument[]> {
  return [...DEMO_GUESTS]
}

export async function getAllRSVPs(): Promise<RSVPSubmission[]> {
  ensureDemoSeeded()
  return Array.from(demoRsvpByGuestId.values())
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
