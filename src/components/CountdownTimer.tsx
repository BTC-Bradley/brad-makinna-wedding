'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import CelebrationConfetti from '@/components/CelebrationConfetti'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

type CelebrationMode = 'wedding-day' | 'married'

interface CelebrationContent {
  emoji: string
  floatingEmojis: string[]
  title: string
  subtitle: string
}

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

function getCelebrationContent(mode?: CelebrationMode): CelebrationContent {
  const isWeddingDay =
    mode === 'wedding-day' ||
    (mode !== 'married' && Date.now() < WEDDING_DAY_END.getTime())

  if (isWeddingDay) {
    return {
      emoji: '🎉',
      floatingEmojis: ['🎉', '💒', '🥂', '✨', '💐', '🎊'],
      title: "It's Our Wedding Day!",
      subtitle:
        'The countdown is over — let the celebration begin! Cheers to the Hansons!',
    }
  }

  return {
    emoji: '💍',
    floatingEmojis: ['💍', '💖', '🎊', '✨', '🥂', '💕'],
    title: 'Just Married!',
    subtitle:
      'Bradley & MaKinna said "I do." Thank you for being part of our story!',
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

function FloatingEmoji({ emoji, index }: { emoji: string; index: number }) {
  const xOffset = (index % 3) * 40 - 40
  const delay = index * 0.2

  return (
    <motion.span
      className="pointer-events-none absolute text-2xl sm:text-3xl"
      style={{ left: `${20 + index * 12}%`, top: '10%' }}
      initial={{ opacity: 0, y: 10, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [10, -30, -55],
        x: [0, xOffset],
        scale: [0.4, 1.2, 1],
        rotate: [0, index % 2 === 0 ? 15 : -15, 0],
      }}
      transition={{
        delay,
        duration: 2.5,
        repeat: Infinity,
        repeatDelay: 0.8,
        ease: 'easeOut',
      }}
      aria-hidden="true"
    >
      {emoji}
    </motion.span>
  )
}

function CelebrationDisplay({
  content,
  previewMode,
}: {
  content: CelebrationContent
  previewMode: CelebrationMode | null
}) {
  return (
    <>
      <CelebrationConfetti active />
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative mx-auto max-w-xl px-4 pb-20"
      >
        {content.floatingEmojis.map((emoji, index) => (
          <FloatingEmoji key={`${emoji}-${index}`} emoji={emoji} index={index} />
        ))}

        <motion.p
          className="text-5xl sm:text-6xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          {content.emoji}
        </motion.p>

        <motion.p
          className="font-script mt-2 text-4xl text-white sm:text-5xl"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          {content.title} {content.emoji}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-4 font-serif text-lg text-white/90 sm:text-xl"
        >
          {content.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ delay: 0.8, duration: 2, repeat: Infinity }}
          className="mt-4 text-2xl"
          aria-hidden="true"
        >
          ✨ 🥂 ✨
        </motion.p>

        {previewMode && (
          <p className="mt-4 text-xs tracking-wide text-white/50 uppercase">
            Preview: countdown=
            {previewMode === 'wedding-day' ? '0' : 'married'}
          </p>
        )}
      </motion.div>
    </>
  )
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null | undefined>(
    undefined,
  )
  const [celebration, setCelebration] = useState<CelebrationContent | null>(
    null,
  )
  const [previewMode, setPreviewMode] = useState<CelebrationMode | null>(null)

  useEffect(() => {
    const preview = getPreviewMode()

    if (preview) {
      setPreviewMode(preview)
      setCelebration(getCelebrationContent(preview))
      setTimeLeft(null)
      return
    }

    const update = () => {
      const left = calculateTimeLeft()

      if (left === null) {
        setCelebration(getCelebrationContent())
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
      <CelebrationDisplay content={celebration} previewMode={previewMode} />
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