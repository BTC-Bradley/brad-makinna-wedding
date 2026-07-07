import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Schedule | Bradley & MaKinna Hanson',
  description: 'Wedding day schedule and timeline',
}

export default function SchedulePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
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
                Send-off
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
          <div className="flex items-start gap-4">
            <div className="w-24 shrink-0 text-right">
              <p className="text-sage font-medium dark:text-amber-400">
                10:00 PM
              </p>
            </div>
            <div className="border-sage border-l-2 pl-4 dark:border-amber-400">
              <h3 className="text-sage font-serif text-lg dark:text-amber-400">
                After Party
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                The party don&apos;t stop — keep celebrating with the new Mr.
                and Mrs. Hanson!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-lg bg-white p-8 shadow-md dark:bg-zinc-800 dark:shadow-lg">
        <h2 className="text-sage mb-2 font-serif text-2xl dark:text-amber-400">
          After Party Details
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Saturday, July 11 • 10:00 PM – 1:00 AM
        </p>

        <div className="space-y-4 text-gray-700 dark:text-gray-200">
          <div>
            <p className="text-sage font-medium dark:text-amber-400">
              No Boat Brewing Company
            </p>
            <p>
              35214 SE Center St, Unit 2
              <br />
              Snoqualmie, WA
            </p>
            <div className="mt-2 flex flex-wrap gap-4 text-sm">
              <a
                href="https://www.google.com/maps/search/?api=1&query=35214+SE+Center+St,+Snoqualmie,+WA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sage hover:text-sage/80 underline dark:text-amber-400 dark:hover:text-amber-300"
              >
                Google Maps
              </a>
              <a
                href="https://maps.apple.com/?q=35214+SE+Center+St,+Snoqualmie,+WA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sage hover:text-sage/80 underline dark:text-amber-400 dark:hover:text-amber-300"
              >
                Apple Maps
              </a>
            </div>
          </div>

          <p>
            Everyone invited to the wedding is welcome! No Boat will be open
            before 10:00 PM if you&apos;d like to head over early, but our
            reserved space begins at 10:00 PM.
          </p>

          <div>
            <p className="text-sage mb-2 font-medium dark:text-amber-400">
              Getting There
            </p>
            <ul className="space-y-2">
              <li>
                <strong>From the hotel:</strong> Take the wedding shuttle back
                to the Snoqualmie Inn, then walk across the parking lot to No
                Boat (~30 seconds).
              </li>
              <li>
                <strong>From the venue:</strong> About a 12-minute drive.
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sage mb-2 font-medium dark:text-amber-400">
              Good to Know
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Come as you are — wedding attire encouraged, dancing shoes
                highly recommended
              </li>
              <li>Drinks available for purchase</li>
              <li>Under 21 are welcome but will not be served alcohol</li>
              <li>
                Open decks — bring a USB with your Rekordbox library (Library
                Plus format)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
