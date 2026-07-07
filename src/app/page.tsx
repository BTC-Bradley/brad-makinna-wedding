import Image from 'next/image'
import { Metadata } from 'next'
import CountdownTimer from '@/components/CountdownTimer'
import heroBgImage from '@/images/hero-bg.jpg'

export const metadata: Metadata = {
  title: 'Bradley & MaKinna Hanson | Wedding',
  description:
    'Join us for our wedding celebration on July 11, 2026 at Snoqualmie, WA',
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex h-screen items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBgImage}
            alt="Engagement photo"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
        </div>

        <div className="relative z-10 px-4 text-center">
          <h1 className="font-script mb-4 text-5xl text-white sm:text-7xl">
            Bradley & MaKinna
            <span className="mt-4 block text-3xl font-light tracking-widest sm:text-4xl">
              Hanson
            </span>
          </h1>
          <p className="mb-8 font-serif text-xl tracking-wide text-white sm:text-2xl">
            July 11, 2026 • Snoqualmie, WA
          </p>
          <CountdownTimer />
        </div>
      </section>

      {/* Weekend Info Section */}
      <section className="bg-ivory py-16 dark:bg-zinc-900">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-amber mb-4 font-serif text-3xl dark:text-amber-400">
            Wedding Weekend
          </h2>
          <p className="mb-8 text-gray-700 dark:text-gray-300">
            We can&apos;t wait to celebrate with you! Here&apos;s the full
            weekend at a glance.
          </p>

          <div className="mb-8 space-y-4 text-left">
            <div className="rounded-lg bg-white/60 p-5 ring-1 ring-gray-200/60 dark:bg-zinc-800/60 dark:ring-gray-700/50">
              <p className="text-amber mb-1 font-serif text-lg dark:text-amber-400">
                Saturday, July 11
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Wedding</strong> at North Fork Farm — arrive by 2:30
                PM, ceremony at 3:00 PM
              </p>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                <strong>After party</strong> at No Boat Brewing Company — 10:00
                PM to 1:00 AM
              </p>
            </div>
            <div className="rounded-lg bg-white/60 p-5 ring-1 ring-gray-200/60 dark:bg-zinc-800/60 dark:ring-gray-700/50">
              <p className="text-amber mb-1 font-serif text-lg dark:text-amber-400">
                Sunday, July 12
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Farewell brunch</strong> at South Fork Event Center —
                10:00 AM to 12:00 PM
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Casual drop-in — first come, first served seating
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/travel"
              className="text-amber text-sm font-medium transition-colors hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300"
            >
              Travel & Shuttle →
            </a>
            <a
              href="/schedule"
              className="text-amber text-sm font-medium transition-colors hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300"
            >
              Full Schedule →
            </a>
            <a
              href="/faq"
              className="text-amber text-sm font-medium transition-colors hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300"
            >
              FAQ & Weather →
            </a>
          </div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="bg-gray-50 py-16 dark:bg-zinc-950">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-16 md:grid-cols-3">
          <div className="bg-ivory rounded-lg p-6 text-center shadow-lg ring-1 ring-gray-200/50 dark:bg-zinc-900 dark:ring-gray-700/50">
            <h3 className="text-amber mb-4 font-serif text-xl dark:text-amber-400">
              Event Details
            </h3>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Please arrive at 2:30 PM
              </p>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                <strong>Location:</strong> North Fork Farm
              </p>
              <a
                href="/travel"
                className="text-amber text-sm font-medium transition-colors hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300"
              >
                View Travel Information →
              </a>
            </div>
          </div>
          <div className="bg-ivory rounded-lg p-6 text-center shadow-lg ring-1 ring-gray-200/50 dark:bg-zinc-900 dark:ring-gray-700/50">
            <h3 className="text-amber mb-4 font-serif text-xl dark:text-amber-400">
              Schedule
            </h3>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Ceremony begins at 3:00 PM. Please arrive by 2:30 PM.
            </p>
            <a
              href="/schedule"
              className="text-amber text-sm font-medium transition-colors hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300"
            >
              View Full Schedule →
            </a>
          </div>
          <div className="bg-ivory rounded-lg p-6 text-center shadow-lg ring-1 ring-gray-200/50 dark:bg-zinc-900 dark:ring-gray-700/50">
            <h3 className="text-amber mb-4 font-serif text-xl dark:text-amber-400">
              Travel
            </h3>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Shuttle times, parking, and hotel info for the weekend.
            </p>
            <a
              href="/travel#shuttle"
              className="text-amber text-sm font-medium transition-colors hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300"
            >
              View Shuttle Schedule →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
