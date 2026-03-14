'use client'

import { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function StatsCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    // July 11, 2026 — ceremony time ~4pm Pacific
    const weddingDate = new Date('2026-07-11T16:00:00-07:00')

    const calculate = (): TimeLeft => {
      const diff = weddingDate.getTime() - Date.now()
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      }
    }

    setTimeLeft(calculate())
    const timer = setInterval(() => setTimeLeft(calculate()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!timeLeft) {
    return <div className="h-24" />
  }

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ]

  return (
    <div className="flex justify-center gap-3 sm:gap-6">
      {units.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center">
          <div className="min-w-[3rem] rounded-xl border border-sage/30 bg-sage/10 px-3 py-3 text-center dark:border-amber-400/30 dark:bg-amber-400/10">
            <span className="font-serif text-3xl font-light text-sage dark:text-amber-400">
              {String(value).padStart(2, '0')}
            </span>
          </div>
          <span className="mt-1.5 text-xs font-medium tracking-wider text-gray-400 uppercase dark:text-gray-500">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
