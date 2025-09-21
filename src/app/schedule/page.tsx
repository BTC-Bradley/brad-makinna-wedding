import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Schedule | Bradley & MaKinna Hanson',
  description: 'Wedding day schedule and timeline',
}

export default function SchedulePage() {
  return (
    <section className="bg-ivory min-h-screen py-16 dark:bg-zinc-900">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="text-sage mb-6 text-center font-serif text-5xl font-light tracking-wide dark:text-amber-400">
          Wedding Day Schedule
        </h1>
        <div className="bg-sage/30 mx-auto mb-8 h-1 w-24 dark:bg-amber-400/30"></div>
        <div className="mt-12 rounded-lg bg-white p-8 shadow-md dark:bg-zinc-800 dark:shadow-lg">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-24 shrink-0 text-right">
                <p className="text-sage font-medium dark:text-amber-400">
                  2:30 PM
                </p>
              </div>
              <div className="border-sage border-l-2 pl-4 dark:border-amber-400">
                <h3 className="text-sage font-serif text-lg dark:text-amber-400">
                  Guest Arrival
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Please arrive on time to find your seat
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-24 shrink-0 text-right">
                <p className="text-sage font-medium dark:text-amber-400">
                  3:00 PM
                </p>
              </div>
              <div className="border-sage border-l-2 pl-4 dark:border-amber-400">
                <h3 className="text-sage font-serif text-lg dark:text-amber-400">
                  Ceremony
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  The main event begins
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-24 shrink-0 text-right">
                <p className="text-sage font-medium dark:text-amber-400">
                  3:30 PM
                </p>
              </div>
              <div className="border-sage border-l-2 pl-4 dark:border-amber-400">
                <h3 className="text-sage font-serif text-lg dark:text-amber-400">
                  Cocktail Hour
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Charcuterie board, oysters, and refreshments
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-24 shrink-0 text-right">
                <p className="text-sage font-medium dark:text-amber-400">
                  5:00 PM
                </p>
              </div>
              <div className="border-sage border-l-2 pl-4 dark:border-amber-400">
                <h3 className="text-sage font-serif text-lg dark:text-amber-400">
                  Reception
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Dinner, toasts & dancing
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-24 shrink-0 text-right">
                <p className="text-sage font-medium dark:text-amber-400">
                  8:55 PM
                </p>
              </div>
              <div className="border-sage border-l-2 pl-4 dark:border-amber-400">
                <h3 className="text-sage font-serif text-lg dark:text-amber-400">
                  Sparkler Send-off
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Join us for a magical farewell
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-24 shrink-0 text-right">
                <p className="text-sage font-medium dark:text-amber-400">
                  9:00 PM
                </p>
              </div>
              <div className="border-sage border-l-2 pl-4 dark:border-amber-400">
                <h3 className="text-sage font-serif text-lg dark:text-amber-400">
                  Venue Closing
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Strictly enforced per venue contract
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
