import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Day Of | Bradley & MaKinna',
  description:
    'Wedding day timeline and itinerary for Bradley & MaKinna — July 11, 2026 in Snoqualmie, WA',
}

interface TimelineEvent {
  time: string
  title: string
  description?: string
  emoji: string
  highlight?: boolean
}

const events: TimelineEvent[] = [
  {
    time: '4:00 PM',
    emoji: '🌿',
    title: 'Guests Arrive & Be Seated',
    description:
      'Please arrive early to find your seat, enjoy the ambiance, and settle in before the ceremony begins.',
  },
  {
    time: '4:30 PM',
    emoji: '💍',
    title: 'Ceremony Begins',
    description:
      'We exchange vows and become husband and wife surrounded by the people we love most.',
    highlight: true,
  },
  {
    time: '5:00 PM',
    emoji: '🥂',
    title: 'Cocktail Hour',
    description:
      'Celebrate with cocktails, light bites, and great company while we take photos with the wedding party.',
  },
  {
    time: '6:00 PM',
    emoji: '🎊',
    title: 'Reception Doors Open',
    description: 'Find your seat in the reception hall and get ready for an unforgettable evening.',
  },
  {
    time: '6:30 PM',
    emoji: '✨',
    title: 'Grand Entrance',
    description: 'The wedding party and newlyweds make their grand entrance into the reception.',
    highlight: true,
  },
  {
    time: '7:00 PM',
    emoji: '🍽️',
    title: 'Dinner Service',
    description: 'Enjoy a delicious dinner as we celebrate together. Sit back, eat, and soak it all in.',
  },
  {
    time: '8:00 PM',
    emoji: '💃',
    title: 'First Dance',
    description: 'Bradley and MaKinna share their first dance as husband and wife.',
    highlight: true,
  },
  {
    time: '8:15 PM',
    emoji: '🎤',
    title: 'Toasts',
    description:
      'Raise a glass as family and friends share heartfelt words for the happy couple.',
  },
  {
    time: '9:00 PM',
    emoji: '🎶',
    title: 'Dancing',
    description: 'The dance floor opens — we want everyone out there. Come celebrate with us!',
  },
  {
    time: '11:00 PM',
    emoji: '🌙',
    title: 'Last Dance & Farewell',
    description:
      "One final song together before we send you off with full hearts. Thank you for being part of our day.",
    highlight: true,
  },
]

export default function DayOfPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      {/* Header */}
      <div className="mb-16 text-center">
        <p className="text-sage mb-2 font-sans text-sm uppercase tracking-widest dark:text-amber-400">
          July 11, 2026 · Snoqualmie, WA
        </p>
        <h1 className="text-sage mb-6 font-serif text-5xl font-light tracking-wide dark:text-amber-400">
          Day Of Timeline
        </h1>
        <div className="bg-sage/30 mx-auto mb-8 h-1 w-24 dark:bg-amber-400/30"></div>
        <p className="text-gray-500 dark:text-gray-400">
          Here&apos;s how the day is planned to unfold. We can&apos;t wait to celebrate with you.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="bg-sage/25 absolute top-0 left-[2.35rem] h-full w-0.5 dark:bg-amber-400/20 sm:left-[2.85rem]" />

        <div className="space-y-0">
          {events.map((event, index) => (
            <div key={index} className="relative flex gap-4 sm:gap-6">
              {/* Dot + icon column */}
              <div className="relative z-10 flex flex-col items-center">
                <div
                  className={`flex h-[4.7rem] w-[4.7rem] shrink-0 flex-col items-center justify-center rounded-full border-2 bg-white shadow-sm transition-all dark:bg-zinc-900
                    ${
                      event.highlight
                        ? 'border-sage/70 dark:border-amber-400/70'
                        : 'border-sage/30 dark:border-amber-400/30'
                    }
                  `}
                >
                  <span className="text-2xl leading-none">{event.emoji}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                <div
                  className={`rounded-xl border p-5 shadow-sm transition-shadow hover:shadow-md
                    ${
                      event.highlight
                        ? 'border-sage/40 bg-sage/5 dark:border-amber-400/30 dark:bg-amber-400/5'
                        : 'border-gray-100 bg-white dark:border-zinc-700 dark:bg-zinc-800'
                    }
                  `}
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                    <span
                      className={`shrink-0 font-sans text-sm font-semibold tracking-wide
                        ${event.highlight ? 'text-sage dark:text-amber-400' : 'text-sage/80 dark:text-amber-400/70'}
                      `}
                    >
                      {event.time}
                    </span>
                    <h3
                      className={`font-serif text-lg leading-snug
                        ${event.highlight ? 'text-sage dark:text-amber-300' : 'text-gray-800 dark:text-gray-100'}
                      `}
                    >
                      {event.title}
                    </h3>
                  </div>
                  {event.description && (
                    <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-8 rounded-lg border border-sage/20 bg-sage/5 px-6 py-4 text-center dark:border-amber-400/20 dark:bg-amber-400/5">
        <p className="text-sm text-gray-500 italic dark:text-gray-400">
          📋 Schedule subject to change — check back closer to the date
        </p>
      </div>
    </div>
  )
}
