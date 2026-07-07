const SNOQUALMIE_LAT = 47.5287
const SNOQUALMIE_LON = -121.8254
export const WEDDING_DATE = '2026-07-11'
const FORECAST_START_HOUR = 12
const FORECAST_END_HOUR = 22

interface OpenMeteoResponse {
  hourly: {
    time: string[]
    temperature_2m: number[]
    precipitation_probability: number[]
    weather_code: number[]
  }
  daily: {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    precipitation_probability_max: number[]
    weather_code: number[]
  }
}

export interface HourlyForecast {
  time: string
  hourLabel: string
  temperature: number
  precipitationProbability: number
  condition: string
}

export interface WeddingWeatherForecast {
  weddingDate: string
  weddingDateLabel: string
  high: number
  low: number
  maxPrecipitationProbability: number
  summary: string
  hourly: HourlyForecast[]
  updatedAt: string
  source: string
}

export function describeWeatherCode(code: number): string {
  if (code === 0) return 'Clear'
  if (code <= 3) return 'Partly cloudy'
  if (code <= 48) return 'Foggy'
  if (code <= 55) return 'Drizzle'
  if (code <= 65) return 'Rain'
  if (code <= 75) return 'Snow'
  if (code <= 82) return 'Showers'
  if (code >= 95) return 'Thunderstorms'
  return 'Mixed conditions'
}

function formatHourLabel(isoTime: string): string {
  // Open-Meteo returns times already in the requested timezone (no offset
  // suffix), so parse the hour directly instead of using Date (which would
  // misinterpret the value as UTC on the server and shift labels by 7 hours).
  const hour = Number(isoTime.slice(11, 13))
  const minute = Number(isoTime.slice(14, 16))
  const period = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12

  if (minute === 0) {
    return `${displayHour}:00 ${period}`
  }

  return `${displayHour}:${String(minute).padStart(2, '0')} ${period}`
}

function formatWeddingDateLabel(date: string): string {
  const [year, month, day] = date.split('-').map(Number)
  const weddingDate = new Date(year, month - 1, day)
  return weddingDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function buildSummary(
  high: number,
  low: number,
  maxPrecipitationProbability: number,
  weatherCode: number,
): string {
  const condition = describeWeatherCode(weatherCode).toLowerCase()
  const precipText =
    maxPrecipitationProbability >= 40
      ? `Rain is possible (${maxPrecipitationProbability}% chance).`
      : maxPrecipitationProbability >= 15
        ? `A brief shower is possible (${maxPrecipitationProbability}% chance).`
        : 'Rain is unlikely.'

  return `Expect ${condition} skies with highs around ${Math.round(high)}°F and lows near ${Math.round(low)}°F. ${precipText}`
}

export async function getWeddingWeatherForecast(): Promise<WeddingWeatherForecast> {
  const url = new URL('https://api.open-meteo.com/v1/forecast')
  url.searchParams.set('latitude', String(SNOQUALMIE_LAT))
  url.searchParams.set('longitude', String(SNOQUALMIE_LON))
  url.searchParams.set(
    'hourly',
    'temperature_2m,precipitation_probability,weather_code',
  )
  url.searchParams.set(
    'daily',
    'temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code',
  )
  url.searchParams.set('temperature_unit', 'fahrenheit')
  url.searchParams.set('timezone', 'America/Los_Angeles')
  url.searchParams.set('forecast_days', '7')

  const response = await fetch(url, { next: { revalidate: 1800 } })

  if (!response.ok) {
    throw new Error('Failed to fetch weather forecast')
  }

  const data = (await response.json()) as OpenMeteoResponse
  const dayIndex = data.daily.time.indexOf(WEDDING_DATE)

  if (dayIndex === -1) {
    throw new Error('Wedding day forecast is not yet available')
  }

  const hourly = data.hourly.time
    .map((time, index) => ({
      time,
      hour: Number(time.slice(11, 13)),
      temperature: data.hourly.temperature_2m[index],
      precipitationProbability: data.hourly.precipitation_probability[index],
      weatherCode: data.hourly.weather_code[index],
    }))
    .filter(
      (entry) =>
        entry.time.startsWith(WEDDING_DATE) &&
        entry.hour >= FORECAST_START_HOUR &&
        entry.hour <= FORECAST_END_HOUR,
    )
    .map((entry) => ({
      time: entry.time,
      hourLabel: formatHourLabel(entry.time),
      temperature: Math.round(entry.temperature),
      precipitationProbability: entry.precipitationProbability,
      condition: describeWeatherCode(entry.weatherCode),
    }))

  const high = data.daily.temperature_2m_max[dayIndex]
  const low = data.daily.temperature_2m_min[dayIndex]
  const maxPrecipitationProbability =
    data.daily.precipitation_probability_max[dayIndex]
  const weatherCode = data.daily.weather_code[dayIndex]

  return {
    weddingDate: WEDDING_DATE,
    weddingDateLabel: formatWeddingDateLabel(WEDDING_DATE),
    high: Math.round(high),
    low: Math.round(low),
    maxPrecipitationProbability,
    summary: buildSummary(
      high,
      low,
      maxPrecipitationProbability,
      weatherCode,
    ),
    hourly,
    updatedAt: new Date().toISOString(),
    source: 'Open-Meteo',
  }
}