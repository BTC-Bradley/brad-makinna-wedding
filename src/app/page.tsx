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

      {/* Engagement Story Section */}
      <section className="bg-ivory py-16 dark:bg-zinc-900">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-amber mb-8 text-center font-serif text-3xl dark:text-amber-400">
            Our Story
          </h2>
          <div className="prose-lg prose mx-auto dark:prose-invert">
            <p className="text-center text-gray-700 dark:text-gray-300">
              In a moment that took our breath away, Bradley proposed on a
              beautiful beach in Cabo. The sunset painted the sky in hues of
              gold and pink, creating the perfect backdrop for our new
              beginning. Now, we&apos;re excited to celebrate our love with
              family and friends in the rustic charm of Snoqualmie WA.
            </p>
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
              RSVP
            </h3>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Please use your code to RSVP.
            </p>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              <strong>Deadline:</strong> April 11, 2026
            </p>
            <a
              href="/rsvp"
              className="text-amber text-sm font-medium transition-colors hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300"
            >
              RSVP Now →
            </a>
          </div>
          <div className="bg-ivory rounded-lg p-6 text-center shadow-lg ring-1 ring-gray-200/50 dark:bg-zinc-900 dark:ring-gray-700/50">
            <h3 className="text-amber mb-4 font-serif text-xl dark:text-amber-400">
              Registry
            </h3>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Your presence is the greatest gift of all.
            </p>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              <strong>Registry:</strong> House/Honeymoon Fund
            </p>
            <a
              href="/gifts"
              className="text-amber text-sm font-medium transition-colors hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300"
            >
              View Gift Options →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
