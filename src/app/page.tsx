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
          <h1 className="font-script mb-4 text-5xl sm:text-7xl text-white">
            Bradley & MaKinna
            <span className="mt-4 block text-3xl font-light tracking-widest sm:text-4xl">
              Hanson
            </span>
          </h1>
          <p className="mb-8 font-serif text-xl tracking-wide sm:text-2xl text-white">
            July 11, 2026 • Snoqualmie, WA
          </p>
          <CountdownTimer />
        </div>
      </section>

      {/* Engagement Story Section */}
      <section className="bg-ivory dark:bg-zinc-900 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-amber dark:text-amber-400 mb-8 text-center font-serif text-3xl">
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

      {/* Quick Links Section */}
      <section className="bg-white dark:bg-zinc-950 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-3">
          <div className="bg-ivory dark:bg-zinc-900 rounded-lg p-6 text-center">
            <h3 className="text-amber dark:text-amber-400 mb-4 font-serif text-xl">Event Details</h3>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p>
                <strong>Date:</strong> July 11, 2026
              </p>
              <p>
                <strong>Time:</strong> 2:30 PM Guest Arrival
              </p>
              <p>
                <strong>Location:</strong> North Fork Farm
              </p>
            </div>
          </div>
          <div className="bg-ivory dark:bg-zinc-900 rounded-lg p-6 text-center">
            <h3 className="text-amber dark:text-amber-400 mb-4 font-serif text-xl">RSVP</h3>
            <p className="mb-3 text-gray-700 dark:text-gray-300">
              We joyfully invite you to share in our celebration of love.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Please respond by June 1st, 2026
            </p>
          </div>
          <div className="bg-ivory dark:bg-zinc-900 rounded-lg p-6 text-center">
            <h3 className="text-amber dark:text-amber-400 mb-4 font-serif text-xl">Registry</h3>
            <p className="mb-3 text-gray-700 dark:text-gray-300">
              Your presence is the greatest gift of all.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Contributions to our honeymoon fund or future home are
              appreciated.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
