import { NextRequest, NextResponse } from 'next/server'
import {
  getGuestById,
  saveRSVPSubmission,
  getExistingRSVP,
} from '@/lib/data-store'
import { RSVPSubmission } from '@/interfaces/guest'
import { config } from '@/config'

// In-memory rate limiter (per serverless instance)
const rateLimit = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 5 // 5 requests per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  entry.count++
  return entry.count > RATE_LIMIT_MAX
}

export async function POST(request: NextRequest) {
  try {
    if (!config.rsvpOpen) {
      return NextResponse.json(
        { error: 'RSVPs are now closed.' },
        { status: 403 },
      )
    }

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a minute.' },
        { status: 429 },
      )
    }

    const body = await request.json()

    const { guestId, rsvpId, attending, attendingGuests } = body

    if (!guestId || !rsvpId || attending === undefined || !attendingGuests) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: guestId, rsvpId, attending, attendingGuests',
        },
        { status: 400 },
      )
    }

    const guestList = await getGuestById(guestId)

    if (!guestList) {
      return NextResponse.json(
        { error: 'Guest list not found' },
        { status: 404 },
      )
    }

    const existingRSVP = await getExistingRSVP(guestId)
    if (existingRSVP) {
      return NextResponse.json(
        { error: 'already_submitted' },
        { status: 409 },
      )
    }

    const rsvpData: RSVPSubmission = {
      guestId,
      rsvpId,
      attending,
      attendingGuests,
      dietaryRestrictions: body.dietaryRestrictions,
      additionalNotes: body.additionalNotes,
      submittedAt: new Date().toISOString(),
      submittedBy: body.submittedBy,
      group: 'Demo',
    }

    const savedRSVP = await saveRSVPSubmission(rsvpData)

    if (!savedRSVP) {
      return NextResponse.json(
        { error: 'Failed to save RSVP submission' },
        { status: 500 },
      )
    }

    return NextResponse.json(
      {
        message: 'RSVP submitted successfully',
        rsvpId: savedRSVP.id,
        demo: config.demoMode,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Error submitting RSVP:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
