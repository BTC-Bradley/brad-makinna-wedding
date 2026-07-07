'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

type CelebrationMode = 'wedding-day' | 'married'

// 3:00 PM Pacific on July 11, 2026 (PDT, UTC-7)
const WEDDING_DATE = new Date('2026-07-11T15:00:00-07:00')
const WEDDING_DAY_END = new Date('2026-07-12T06:00:00-07:00')

function calculateTimeLeft(): TimeLeft | null {
  const difference = WEDDING_DATE.getTime() - Date.now()

  if (difference <= 0) {
    return null
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

function getCelebrationMessage(mode?: CelebrationMode) {
  const isWeddingDay =
    mode === 'wedding-day' ||
    (mode !== 'married' && Date.now() < WEDDING_DAY_END.getTime())

  if (isWeddingDay) {
    return {
      title: "It's Our Wedding Day!",
      subtitle:
        'The countdown is over — let the celebration begin. Cheers to the Hansons!',
    }
  }

  return {
    title: 'Just Married!',
    subtitle:
      'Bradley & MaKinna said "I do." Thank you for being part of our story.',
  }
}

function getPreviewMode(): CelebrationMode | null {
  if (typeof window === 'undefined') {
    return null
  }

  const preview = new URLSearchParams(window.location.search).get('countdown')

  if (preview === '0' || preview === 'celebrate' || preview === 'wedding-day') {
    return 'wedding-day'
  }

  if (preview === 'married') {
    return 'married'
  }

  return null
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null | undefined>(
    undefined,
  )
  const [celebration, setCelebration] = useState<{
    title: string
    subtitle: string
  } | null>(null)
  const [previewMode, setPreviewMode] = useState<CelebrationMode | null>(null)

  useEffect(() => {
    const preview = getPreviewMode()

    if (preview) {
      setPreviewMode(preview)
      setCelebration(getCelebrationMessage(preview))
      setTimeLeft(null)
      return
    }

    const update = () => {
      const left = calculateTimeLeft()

      if (left === null) {
        setCelebration(getCelebrationMessage())
        setTimeLeft(null)
        return
      }

      setCelebration(null)
      setTimeLeft(left)
    }

    update()
    const timer = setInterval(update, 1000)
    return () => clearInterval(timer)
  }, [])

  if (timeLeft === undefined && celebration === null) {
    return <div className="h-[60px]" />
  }

  if (celebration) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mx-auto max-w-xl px-4 pb-20"
      >
        <p className="font-script text-4xl text-white sm:text-5xl">
          {celebration.title}
        </p>
        <p className="mt-3 font-serif text-lg text-white/90 sm:text-xl">
          {celebration.subtitle}
        </p>
        {previewMode && (
          <p className="mt-4 text-xs tracking-wide text-white/50 uppercase">
            Preview: countdown={previewMode === 'wedding-day' ? '0' : 'married'}
          </p>
        )}
      </motion.div>
    )
  }

  return (
    <div className="flex justify-center space-x-4 pb-20">
      <div className="text-center">
        <div className="text-3xl font-bold text-white">{timeLeft!.days}</div>
        <div className="text-sm text-white">Days</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-white">{timeLeft!.hours}</div>
        <div className="text-sm text-white">Hours</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-white">{timeLeft!.minutes}</div>
        <div className="text-sm text-white">Minutes</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-white">{timeLeft!.seconds}</div>
        <div className="text-sm text-white">Seconds</div>
      </div>
    </div>
  )
}