'use client'

import { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>()

  useEffect(() => {
    const weddingDate = new Date('2026-07-11T16:00:00')

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = weddingDate.getTime() - now.getTime()

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return timeLeft ? (
    <div className="flex justify-center space-x-4 pb-20">
      <div className="text-center">
        <div className="text-3xl font-bold text-white">{timeLeft.days}</div>
        <div className="text-sm text-white">Days</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-white">{timeLeft.hours}</div>
        <div className="text-sm text-white">Hours</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-white">{timeLeft.minutes}</div>
        <div className="text-sm text-white">Minutes</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-white">{timeLeft.seconds}</div>
        <div className="text-sm text-white">Seconds</div>
      </div>
    </div>
  ) : (
    <div className="h-[60px]"></div>
  )
}
