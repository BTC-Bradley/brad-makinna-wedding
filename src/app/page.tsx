import Image from 'next/image'
import { Metadata } from 'next'
import CountdownTimer from '@/components/CountdownTimer'
import heroBgImage from '@/images/hero-bg.jpg'

export const metadata: Metadata = {
  title: 'MaKinna & Bradley | Wedding',
  description:
    'Join us for our wedding celebration on July 11, 2026 at North Fork Farm',
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
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 px-4 text-center text-white">
          <h1 className="font-script mb-4 text-5xl sm:text-7xl">
            MaKinna & Bradley
          </h1>
          <p className="mb-8 font-serif text-xl sm:text-2xl">
            July 11, 2026 • North Fork Farm
          </p>
          <CountdownTimer />
        </div>
      </section>

      {/* Engagement Story Section */}
      <section className="bg-ivory py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-sage mb-8 text-center font-serif text-3xl">
            Our Story
          </h2>
          <div className="prose-lg prose mx-auto">
            <p className="text-center text-gray-700">
              In a moment that took our breath away, Bradley proposed on a
              beautiful beach in Cabo. The sunset painted the sky in hues of
              gold and pink, creating the perfect backdrop for our new
              beginning. Now, we&apos;re excited to celebrate our love with
              family and friends in the rustic charm of North Fork Farm.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-3">
          <div className="bg-ivory rounded-lg p-6 text-center">
            <h3 className="text-sage mb-4 font-serif text-xl">Event Details</h3>
            <p className="text-gray-700">TBA</p>
          </div>
          <div className="bg-ivory rounded-lg p-6 text-center">
            <h3 className="text-sage mb-4 font-serif text-xl">RSVP</h3>
            <p className="text-gray-700">TBA</p>
          </div>
          <div className="bg-ivory rounded-lg p-6 text-center">
            <h3 className="text-sage mb-4 font-serif text-xl">Registry</h3>
            <p className="text-gray-700">TBA</p>
          </div>
        </div>
      </section>
    </>
  )
}
