import { NextRequest, NextResponse } from 'next/server'
import { getGuestById, saveRSVPSubmission } from '@/lib/cosmos'
import { RSVPSubmission } from '@/interfaces/guest'

export async function POST(request: NextRequest) {
  try {
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

    console.log('RSVP Submission Data:', rsvpData)

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
