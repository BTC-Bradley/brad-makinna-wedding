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
            <div className="flex items-start gap-4">
              <div className="w-24 shrink-0 text-right">
                <p className="text-sage font-medium">TBD</p>
              </div>
              <div className="border-sage border-l-2 pl-4">
                <h3 className="text-sage font-serif text-lg">Guest Arrival</h3>
                <p className="text-gray-600">Details to be announced</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-24 shrink-0 text-right">
                <p className="text-sage font-medium">TBD</p>
              </div>
              <div className="border-sage border-l-2 pl-4">
                <h3 className="text-sage font-serif text-lg">Ceremony</h3>
                <p className="text-gray-600">Details to be announced</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-24 shrink-0 text-right">
                <p className="text-sage font-medium">TBD</p>
              </div>
              <div className="border-sage border-l-2 pl-4">
                <h3 className="text-sage font-serif text-lg">Cocktail Hour</h3>
                <p className="text-gray-600">Details to be announced</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-24 shrink-0 text-right">
                <p className="text-sage font-medium">TBD</p>
              </div>
              <div className="border-sage border-l-2 pl-4">
                <h3 className="text-sage font-serif text-lg">Reception Dinner</h3>
                <p className="text-gray-600">Details to be announced</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-24 shrink-0 text-right">
                <p className="text-sage font-medium">9:00 PM</p>
              </div>
              <div className="border-sage border-l-2 pl-4">
                <h3 className="text-sage font-serif text-lg">Guest Departure</h3>
                <p className="text-gray-600">Strictly enforced per venue contract</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-24 shrink-0 text-right">
                <p className="text-sage font-medium">9:00 PM</p>
              </div>
              <div className="border-sage border-l-2 pl-4">
                <h3 className="text-sage font-serif text-lg">After Party</h3>
                <p className="text-gray-600">End time TBD</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
