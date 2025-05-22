import { NextResponse } from 'next/server'
import type { GuestListDocument } from '@/interfaces/guest'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id

    // Placeholder test data
    const guestList: GuestListDocument = {
      id,
      rsvpId: 'RSVP-2024-001',
      names: 'John & Jane Smith',
      formalAddressing: 'Mr. and Mrs. John Smith',
      sortName: 'Smith, John & Jane',
      guest1: {
        title: 'Mr.',
        firstName: 'John',
        lastName: 'Smith',
        suffix: '',
      },
      guest2: {
        title: 'Mrs.',
        firstName: 'Jane',
        lastName: 'Smith',
        suffix: '',
      },
      additionalGuests: [
        {
          title: 'Ms.',
          firstName: 'Sarah',
          lastName: 'Smith',
          suffix: '',
        }
      ],
      guestCount: 3,
      outOfTown: 'Yes',
      address: {
        street: '123 Wedding Lane',
        streetLine2: 'Apt 4B',
        city: 'New York',
        stateProvince: 'NY',
        postalCode: '10001',
        country: 'USA',
        formatted: {
          line1: 'Mr. and Mrs. John Smith',
          line2: '123 Wedding Lane, Apt 4B',
          line3: 'New York, NY 10001',
          line4: 'USA',
        },
      },
      email: 'john.smith@example.com',
      phone: '(555) 123-4567',
      group: 'Bride\'s Family',
      list: 'A',
      giftReceived: 'No',
      thankYouSent: 'No',
    }

    if (!guestList) {
      return NextResponse.json(
        { error: 'Guest list not found' },
        { status: 404 },
      )
    }

    return NextResponse.json(guestList)
  } catch (error) {
    console.error('Error fetching guest list:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
