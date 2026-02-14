import { NextRequest, NextResponse } from 'next/server'
import { getGuestById, saveRSVPSubmission, getExistingRSVP } from '@/lib/cosmos'
import { RSVPSubmission } from '@/interfaces/guest'

// In-memory rate limiter (per Vercel serverless instance)
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
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a minute.' },
        { status: 429 },
      )
    }

    const body = await request.json()

    // Validate required fields
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

    // Block resubmission if RSVP already exists
    const existingRSVP = await getExistingRSVP(guestId)
    if (existingRSVP) {
      return NextResponse.json(
        { error: 'already_submitted' },
        { status: 409 },
      )
    }

    // Create RSVP submission object
    const rsvpData: RSVPSubmission = {
      guestId,
      rsvpId,
      attending,
      attendingGuests,
      dietaryRestrictions: body.dietaryRestrictions,
      additionalNotes: body.additionalNotes,
      submittedAt: new Date().toISOString(),
      submittedBy: body.submittedBy,
    }

    // Save to Cosmos DB
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
