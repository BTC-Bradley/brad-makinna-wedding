'use client'

import { useEffect, useState } from 'react'
import type { WeddingWeatherForecast } from '@/lib/weather'

function formatUpdatedAt(isoTime: string): string {
  const updated = new Date(isoTime)
  return updated.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/Los_Angeles',
  })
}

export default function WeatherForecast() {
  const [forecast, setForecast] = useState<WeddingWeatherForecast | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadForecast() {
      try {
        const response = await fetch('/api/weather')
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to load weather forecast')
        }

        if (isMounted) {
          setForecast(data)
          setError(null)
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : 'Failed to load weather forecast',
          )
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadForecast()

    return () => {
      isMounted = false
    }
  }, [])

  if (isLoading) {
    return (
      <p className="text-gray-600 dark:text-gray-300">
        Loading the latest forecast for Snoqualmie...
      </p>
    )
  }

  if (error || !forecast) {
    return (
      <div className="space-y-3 text-gray-700 dark:text-gray-200">
        <p>
          We couldn&apos;t load a live forecast right now. For the latest
          conditions, check{' '}
          <a
            href="https://forecast.weather.gov/MapClick.php?lat=47.5287&lon=-121.8254"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sage hover:text-sage/80 underline dark:text-amber-400 dark:hover:text-amber-300"
          >
            the National Weather Service forecast for Snoqualmie
          </a>
          .
        </p>
        <p>
          July weather in the area is usually warm during the day and cooler in
          the evening, so lightweight layers are a good idea.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-5 text-gray-700 dark:text-gray-200">
      <div>
        <p className="text-sage font-medium dark:text-amber-400">
          {forecast.weddingDateLabel} • Snoqualmie, WA
        </p>
        <p className="mt-2">{forecast.summary}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-gray-50 p-4 dark:bg-zinc-700/60">
          <p className="text-sm text-gray-500 dark:text-gray-400">High</p>
          <p className="text-2xl font-medium">{forecast.high}°F</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-4 dark:bg-zinc-700/60">
          <p className="text-sm text-gray-500 dark:text-gray-400">Low</p>
          <p className="text-2xl font-medium">{forecast.low}°F</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-4 dark:bg-zinc-700/60">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Rain Chance
          </p>
          <p className="text-2xl font-medium">
            {forecast.maxPrecipitationProbability}%
          </p>
        </div>
      </div>

      <div>
        <h4 className="text-sage mb-3 font-serif text-lg dark:text-amber-400">
          Hourly Forecast (12:00 PM – 10:00 PM)
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 dark:border-zinc-600 dark:text-gray-400">
                <th className="py-2 pr-4 font-medium">Time</th>
                <th className="py-2 pr-4 font-medium">Temp</th>
                <th className="py-2 pr-4 font-medium">Conditions</th>
                <th className="py-2 font-medium">Rain</th>
              </tr>
            </thead>
            <tbody>
              {forecast.hourly.map((hour) => (
                <tr
                  key={hour.time}
                  className="border-b border-gray-100 last:border-0 dark:border-zinc-700/80"
                >
                  <td className="py-2 pr-4 whitespace-nowrap">{hour.hourLabel}</td>
                  <td className="py-2 pr-4 whitespace-nowrap">
                    {hour.temperature}°F
                  </td>
                  <td className="py-2 pr-4">{hour.condition}</td>
                  <td className="py-2 whitespace-nowrap">
                    {hour.precipitationProbability}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p>
        Dress in lightweight fabrics and bring a light jacket for the evening.
        Temperatures often drop once the sun goes down.
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Live forecast updated {formatUpdatedAt(forecast.updatedAt)} via{' '}
        {forecast.source}. Check back before you head out — forecasts can
        change.
      </p>
    </div>
  )
}