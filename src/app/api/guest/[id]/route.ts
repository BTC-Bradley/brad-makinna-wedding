import { NextResponse } from 'next/server'
import { getGuestById } from '@/lib/cosmos'

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

    return NextResponse.json(guestList)
  } catch (error) {
    console.error('Error fetching guest list:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
