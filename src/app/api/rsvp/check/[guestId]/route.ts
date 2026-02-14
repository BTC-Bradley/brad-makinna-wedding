import { NextResponse } from 'next/server'
import { getExistingRSVP } from '@/lib/cosmos'

export async function GET(
  request: Request,
  { params }: { params: { guestId: string } },
) {
  try {
    const existing = await getExistingRSVP(params.guestId)
    return NextResponse.json({ submitted: !!existing })
  } catch (error) {
    console.error('Error checking RSVP status:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
