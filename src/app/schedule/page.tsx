import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Schedule | Bradley & MaKinna Hanson',
  description: 'Wedding day schedule and timeline',
}

export default function SchedulePage() {
  return (
    <section className="bg-ivory min-h-screen py-16">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="text-sage mb-6 text-center font-serif text-5xl font-light tracking-wide dark:text-amber-400">
          Wedding Day Schedule
        </h1>
        <div className="bg-sage/30 mx-auto mb-8 h-1 w-24 dark:bg-amber-400/30"></div>
        <p className="text-center text-gray-600 dark:text-gray-300">
          The detailed schedule for our wedding day will be posted here soon.
        </p>
        <div className="rounded-lg bg-white p-8 shadow-md mt-12">
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
                <h3 className="text-sage font-serif text-lg">
                  Reception Dinner
                </h3>
                <p className="text-gray-600">Details to be announced</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-24 shrink-0 text-right">
                <p className="text-sage font-medium">9:00 PM</p>
              </div>
              <div className="border-sage border-l-2 pl-4">
                <h3 className="text-sage font-serif text-lg">
                  Guest Departure
                </h3>
                <p className="text-gray-600">
                  Strictly enforced per venue contract
                </p>
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
