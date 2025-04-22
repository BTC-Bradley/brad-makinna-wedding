import Image from 'next/image'
import { Metadata } from 'next'
import CountdownTimer from '@/components/CountdownTimer'

export const metadata: Metadata = {
  title: 'Bradley & MaKinna | Wedding',
  description: 'Join us for our wedding celebration on July 11, 2026 at North Fork Farm',
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Engagement photo"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-script text-5xl sm:text-7xl mb-4">
            Bradley & MaKinna
          </h1>
          <p className="font-serif text-xl sm:text-2xl mb-8">
            July 11, 2026 • North Fork Farm
          </p>
          <CountdownTimer />
        </div>
      </section>

      {/* Engagement Story Section */}
      <section className="py-16 bg-ivory">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-serif text-center text-sage mb-8">
            Our Story
          </h2>
          <div className="prose prose-lg mx-auto">
            <p className="text-center text-gray-700">
              In a moment that took our breath away, Bradley proposed on a beautiful beach in Cabo.
              The sunset painted the sky in hues of gold and pink, creating the perfect backdrop
              for our new beginning. Now, we&apos;re excited to celebrate our love with family and friends
              in the rustic charm of North Fork Farm.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-ivory rounded-lg">
            <h3 className="text-xl font-serif text-sage mb-4">Event Details</h3>
            <p className="text-gray-700">
              Ceremony: 4:00 PM
              <br />
              Cocktail Hour: 5:00 PM
              <br />
              Reception: 6:00 PM
            </p>
          </div>
          <div className="text-center p-6 bg-ivory rounded-lg">
            <h3 className="text-xl font-serif text-sage mb-4">RSVP</h3>
            <p className="text-gray-700">
              Please RSVP by May 15, 2026
              <br />
              <a href="/rsvp" className="text-sage hover:text-earth underline">
                Click here to RSVP
              </a>
            </p>
          </div>
          <div className="text-center p-6 bg-ivory rounded-lg">
            <h3 className="text-xl font-serif text-sage mb-4">Registry</h3>
            <p className="text-gray-700">
              Your presence is our greatest gift
              <br />
              <a href="/registry" className="text-sage hover:text-earth underline">
                View our registry
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
