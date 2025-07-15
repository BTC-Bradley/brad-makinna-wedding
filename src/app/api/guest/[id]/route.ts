import { NextResponse } from 'next/server'
import { getGuestById } from '@/lib/cosmos'
import { SafeGuestData } from '@/interfaces/guest'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id
    const guestList = await getGuestById(id)

    if (!guestList) {
      return NextResponse.json(
        { error: 'Guest list not found' },
        { status: 404 },
      )
    }

    // Filter out sensitive address information before sending to client
    const safeGuestData: SafeGuestData = {
      id: guestList.id,
      rsvpId: guestList.rsvpId,
      names: guestList.names,
      formalAddressing: guestList.formalAddressing,
      sortName: guestList.sortName,
      guest1: guestList.guest1,
      guest2: guestList.guest2,
      additionalGuests: guestList.additionalGuests,
      guestCount: guestList.guestCount,
      outOfTown: guestList.outOfTown,
      email: guestList.email,
      phone: guestList.phone,
      group: guestList.group,
      list: guestList.list,
      giftReceived: guestList.giftReceived,
      thankYouSent: guestList.thankYouSent,
    }

    return NextResponse.json(safeGuestData)
  } catch (error) {
    console.error('Error fetching guest list:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
