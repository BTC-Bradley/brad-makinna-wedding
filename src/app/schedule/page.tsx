import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Schedule | Bradley & MaKinna Hanson',
  description:
    'Archived wedding weekend schedule — ceremony, after party, and Sunday brunch (July 11–12, 2026)',
}

export default function SchedulePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-sage mb-6 text-center font-serif text-5xl font-light tracking-wide dark:text-amber-400">
        Weekend Schedule
      </h1>
      <div className="bg-sage/30 mx-auto mb-8 h-1 w-24 dark:bg-amber-400/30"></div>
      <p className="mb-10 text-center text-gray-600 dark:text-gray-300">
        How the weekend ran — preserved from the original guest website.
      </p>

      <h2 className="text-sage mb-6 text-center font-serif text-2xl dark:text-amber-400">
        Saturday, July 11, 2026
      </h2>
      <div className="rounded-lg bg-white p-8 shadow-md dark:bg-zinc-800 dark:shadow-lg">
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
                Guests arrived in time to find their seats
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
                The ceremony began
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
                A farewell send-off for the newlyweds
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
                Venue close time (per contract)
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
                The celebration continued with the new Mr. and Mrs. Hanson
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
          Saturday, July 11, 2026 • 10:00 PM – 1:00 AM
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
            Everyone invited to the wedding was welcome. No Boat was open before
            10:00 PM for guests who wanted to arrive early; our reserved space
            began at 10:00 PM.
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
                Wedding attire was encouraged; dancing shoes were highly
                recommended
              </li>
              <li>Drinks were available for purchase</li>
              <li>Under 21 were welcome but not served alcohol</li>
              <li>
                Open decks — guests could bring a USB with a Rekordbox library
                (Library Plus format)
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-lg bg-white p-8 shadow-md dark:bg-zinc-800 dark:shadow-lg">
        <h2 className="text-sage mb-2 font-serif text-2xl dark:text-amber-400">
          Sunday Brunch
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Sunday, July 12, 2026 • 10:00 AM – 12:00 PM
        </p>

        <div className="space-y-4 text-gray-700 dark:text-gray-200">
          <div>
            <p className="text-sage font-medium dark:text-amber-400">
              South Fork Event Center
            </p>
            <p>
              14303 436th Ave SE
              <br />
              North Bend, WA 98045
            </p>
            <div className="mt-2 flex flex-wrap gap-4 text-sm">
              <a
                href="https://www.google.com/maps/search/?api=1&query=14303+436th+Ave+SE,+North+Bend,+WA+98045"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sage hover:text-sage/80 underline dark:text-amber-400 dark:hover:text-amber-300"
              >
                Google Maps
              </a>
              <a
                href="https://maps.apple.com/?q=14303+436th+Ave+SE,+North+Bend,+WA+98045"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sage hover:text-sage/80 underline dark:text-amber-400 dark:hover:text-amber-300"
              >
                Apple Maps
              </a>
            </div>
          </div>

          <p>
            Guests were invited to a casual farewell brunch before heading home
            — anytime between 10:00 AM and noon.
          </p>

          <p>
            There was no reserved space or special catering. South Fork is open
            to the public, so seating was first come, first served from their
            regular menu.
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            About a 15-minute drive from Snoqualmie. Dine-in and takeout
            available.
          </p>
        </div>
      </div>
    </div>
  )
}
