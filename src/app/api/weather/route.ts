import { NextResponse } from 'next/server'
import { getWeddingWeatherForecast } from '@/lib/weather'

export const revalidate = 1800

export async function GET() {
  try {
    const forecast = await getWeddingWeatherForecast()
    return NextResponse.json(forecast)
  } catch (error) {
    console.error('Error fetching weather forecast:', error)
    return NextResponse.json(
      { error: 'Unable to load weather forecast right now.' },
      { status: 500 },
    )
  }
}