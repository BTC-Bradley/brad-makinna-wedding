import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Schedule | MaKinna & Bradley Hanson',
  description: 'Wedding day schedule and timeline',
}

export default function SchedulePage() {
  return (
    <section className="bg-ivory min-h-screen py-16">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="text-sage mb-8 text-center font-serif text-3xl">
          Wedding Day Schedule
        </h1>
        <div className="rounded-lg bg-white p-8 shadow-md">
          <p className="mb-8 text-center text-gray-700">
            The detailed schedule for our wedding day will be posted here soon.
            Please check back later for updates.
          </p>
          <div className="space-y-6">
            <div className="border-l-2 border-sage pl-4">
              <h3 className="text-lg font-serif text-sage">Ceremony</h3>
              <p className="text-gray-600">Time and details to be announced</p>
            </div>
            <div className="border-l-2 border-sage pl-4">
              <h3 className="text-lg font-serif text-sage">Reception</h3>
              <p className="text-gray-600">Time and details to be announced</p>
            </div>
            <div className="border-l-2 border-sage pl-4">
              <h3 className="text-lg font-serif text-sage">Dinner</h3>
              <p className="text-gray-600">Time and details to be announced</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 