import { NextResponse } from 'next/server'
import { getSongRequestData } from '@/lib/data-store'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const data = await getSongRequestData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching song requests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch song requests' },
      { status: 500 },
    )
  }
}
