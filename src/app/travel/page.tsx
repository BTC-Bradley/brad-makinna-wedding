import TravelIndex from '@/components/TravelIndex'

export default function TravelPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <TravelIndex />
      <div className="mb-12 text-center">
        <h1 className="text-sage mb-6 font-serif text-5xl font-light tracking-wide dark:text-amber-500">
          Travel Information
        </h1>
        <div className="bg-sage/30 mx-auto mb-8 h-1 w-24 dark:bg-amber-500/40"></div>
        <p className="text-gray-600 dark:text-gray-300">
          Everything you need to know about getting to and around Snoqualmie.
        </p>
      </div>

      {/* Hotel Section */}
      <section id="hotel" className="mb-16">
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-zinc-800">
          <div className="mb-6 text-center">
            <div className="bg-sage/10 mb-4 inline-flex items-center justify-center rounded-full p-3 dark:bg-amber-500/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-sage h-8 w-8 dark:text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-sage mb-3 font-serif text-xl dark:text-amber-500">
              Snoqualmie Inn by Hotel America
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              We have reserved a block of rooms at the Snoqualmie Inn by Hotel
              America for your convenience.
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg bg-gray-50 p-6 dark:bg-zinc-700">
              <h4 className="text-sage mb-4 font-serif text-lg dark:text-amber-500">
                Contact Information
              </h4>
              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-200">
                  <span className="font-medium">Address:</span> 35228 Snoqualmie
                  Pkwy, Snoqualmie, WA 98065
                </p>
                <p className="text-gray-700 dark:text-gray-200">
                  <span className="font-medium">Phone:</span>{' '}
                  <a
                    href="tel:+14253633888"
                    className="text-sage hover:text-sage/80 transition-colors dark:text-amber-500 dark:hover:text-amber-400"
                  >
                    (425) 363-3888
                  </a>
                </p>
                <p className="text-gray-700 dark:text-gray-200">
                  <span className="font-medium">Website:</span>{' '}
                  <a
                    href="https://www.thehotelamerica.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sage hover:text-sage/80 transition-colors dark:text-amber-500 dark:hover:text-amber-400"
                  >
                    www.thehotelamerica.com
                  </a>
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-6 dark:bg-zinc-700">
              <h4 className="text-sage mb-4 font-serif text-lg dark:text-amber-500">
                Booking Information
              </h4>
              <div className="space-y-3">
                <p className="text-gray-700 dark:text-gray-200">
                  <span className="font-medium">Booking Code:</span> VHWD12
                </p>
                <p className="text-gray-700 dark:text-gray-200">
                  <span className="font-medium">Booking Deadline:</span> June
                  10, 2026
                </p>

                <div className="bg-sage/5 border-sage/20 dark:bg-sage/10 dark:border-sage/30 mt-4 rounded-lg border p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="text-sage/70 h-5 w-5 dark:text-amber-500/80"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h5 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        Please Note
                      </h5>
                      <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        <p className="mb-2">
                          The discounted rate applies to Friday to Sunday nights
                          only. For additional nights before or after these
                          dates, please call the hotel directly as standard
                          rates will apply.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-sage/5 border-sage/20 dark:bg-sage/10 dark:border-sage/30 mt-4 rounded-lg border p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="text-sage/70 h-5 w-5 dark:text-amber-500/80"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h5 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      Book Early
                    </h5>
                    <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                      <p>
                        We strongly recommend booking your hotel room as soon as
                        possible. Seattle is hosting World Cup events in the
                        weeks leading up to our wedding, which may impact hotel
                        availability and pricing in the area.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://book.rguest.com/onecart/wbe/room/1566/HotelAmerica/2026-07-10/2026-07-12/VHWD12/1"
                target="_blank"
                rel="noopener noreferrer"
                className="border-sage text-sage hover:bg-sage/10 inline-block w-full rounded-md border-2 bg-white px-6 py-3 text-center text-base font-medium transition-colors dark:border-amber-500 dark:bg-zinc-800 dark:text-amber-500 hover:dark:bg-amber-500/10"
              >
                Book Your Room
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Shuttle Section */}
      <section id="shuttle" className="mb-16">
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-zinc-800">
          <div className="mb-6 text-center">
            <div className="bg-sage/10 mb-4 inline-flex items-center justify-center rounded-full p-3 dark:bg-amber-500/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-sage h-8 w-8 dark:text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </div>
            <h3 className="text-sage mb-3 font-serif text-xl dark:text-amber-500">
              Complimentary Hotel Shuttle Service
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              We&apos;re pleased to offer a free shuttle service between the
              Snoqualmie Inn Hotel and the venue for hotel guests only.
            </p>
          </div>

          <div className="mb-6 rounded-lg bg-gray-50 p-6 dark:bg-zinc-700">
            <h4 className="text-sage mb-4 font-serif text-lg dark:text-amber-500">
              Why Take the Shuttle?
            </h4>
            <ul className="space-y-3 text-gray-700 dark:text-gray-200">
              <li className="flex items-start">
                <svg
                  className="text-sage mr-2 h-6 w-6 flex-shrink-0 dark:text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  Completely free for hotel guests staying at the
                  Snoqualmie Inn only
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="text-sage mr-2 h-6 w-6 flex-shrink-0 dark:text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  No need to worry about parking or designated drivers
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="text-sage mr-2 h-6 w-6 flex-shrink-0 dark:text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Convenient pickup and drop-off at the hotel</span>
              </li>
            </ul>
          </div>

          <div className="mb-6 rounded-lg bg-gray-50 p-6 dark:bg-zinc-700">
            <h4 className="text-sage mb-4 font-serif text-lg dark:text-amber-500">
              Shuttle Schedule
            </h4>
            <div className="space-y-6">
              <div>
                <h5 className="mb-3 font-medium text-gray-900 dark:text-gray-100">
                  Departure Trip (Hotel → North Fork Farm)
                </h5>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400 italic">
                  *Shuttle times may be updated with additional departure times as more guests book
                </p>
                <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                  <li className="flex items-start">
                    <svg
                      className="text-sage mr-2 h-6 w-6 flex-shrink-0 dark:text-amber-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>2:15 PM - 2:30 PM</span>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="mb-3 font-medium text-gray-900 dark:text-gray-100">
                  Return Trip (North Fork Farm → Hotel)
                </h5>
                <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                  <li className="flex items-start">
                    <svg
                      className="text-sage mr-2 h-6 w-6 flex-shrink-0 dark:text-amber-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>8:45 PM - 9:00 PM</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 p-6 dark:bg-zinc-700">
            <h4 className="text-sage mb-4 font-serif text-lg dark:text-amber-500">
              Important Information
            </h4>
            <ul className="space-y-3 text-gray-700 dark:text-gray-200">
              <li className="flex items-start">
                <svg
                  className="text-sage mr-2 h-6 w-6 flex-shrink-0 dark:text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  The shuttle can accommodate up to 14 passengers per trip
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="text-sage mr-2 h-6 w-6 flex-shrink-0 dark:text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Each trip takes approximately 30 minutes</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="text-sage mr-2 h-6 w-6 flex-shrink-0 dark:text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  Please arrive at the hotel lobby 10 minutes before scheduled
                  departure times
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 italic dark:text-gray-300">
              We strongly encourage hotel guests to utilize our shuttle service
              for a stress-free celebration experience.
            </p>
          </div>
        </div>
      </section>

      {/* Parking Section */}
      <section id="parking" className="mb-16">
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-zinc-800">
          <div className="mb-6 text-center">
            <div className="bg-sage/10 mb-4 inline-flex items-center justify-center rounded-full p-3 dark:bg-amber-500/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-sage h-8 w-8 dark:text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 13l1.5-4.5a2 2 0 011.9-1.5h10.2a2 2 0 011.9 1.5L21 13v6a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H6v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM5.5 17a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm12 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                />
              </svg>
            </div>
            <h3 className="text-sage mb-3 font-serif text-xl dark:text-amber-500">
              Parking at North Fork Farm
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Limited parking is available at the venue.
            </p>
          </div>
          <div className="mb-6">
            <img
              src="/images/parking.jpg"
              alt="Venue parking area"
              className="w-full rounded-lg object-cover"
            />
          </div>
          <div className="mb-6 rounded-lg bg-gray-50 p-6 dark:bg-zinc-700">
            <h4 className="text-sage mb-4 font-serif text-lg dark:text-amber-500">
              Important Information
            </h4>
            <ul className="space-y-3 text-gray-700 dark:text-gray-200">
              <li className="flex items-start">
                <svg
                  className="text-sage mr-2 h-6 w-6 flex-shrink-0 dark:text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Parking is limited at the venue</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="text-sage mr-2 h-6 w-6 flex-shrink-0 dark:text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  When parking at the venue, please see the attendant for
                  directions.
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-gray-50 p-6 dark:bg-zinc-700">
            <h4 className="text-sage mb-4 font-serif text-lg dark:text-amber-500">
              Parking Directions
            </h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <svg
                  className="text-sage mr-2 h-6 w-6 flex-shrink-0 dark:text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                <p className="text-gray-700 dark:text-gray-200">
                  When arriving at the venue, continue straight past the venue
                  on SE 79th St. A parking attendant will be there to help
                  direct you to available parking spaces.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Airport Section */}
      <section id="airport" className="mb-16">
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-zinc-800">
          <div className="mb-6 text-center">
            <div className="bg-sage/10 mb-4 inline-flex items-center justify-center rounded-full p-3 dark:bg-amber-500/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-sage h-8 w-8 dark:text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-sage mb-3 font-serif text-xl dark:text-amber-500">
              SeaTac International Airport
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              The closest major airport to the venue, located approximately 45
              minutes away.
            </p>
          </div>

          <div className="mb-6 rounded-lg bg-gray-50 p-6 dark:bg-zinc-700">
            <h4 className="text-sage mb-4 font-serif text-lg dark:text-amber-500">
              Transportation Options
            </h4>
            <div className="space-y-4">
              <div>
                <h5 className="mb-2 font-medium text-gray-900 dark:text-gray-100">
                  Rental Cars
                </h5>
                <p className="text-gray-700 dark:text-gray-200">
                  All major rental car companies are available at SeaTac
                  Airport.
                </p>
              </div>
              <div>
                <h5 className="mb-2 font-medium text-gray-900 dark:text-gray-100">
                  Rideshare
                </h5>
                <p className="text-gray-700 dark:text-gray-200">
                  Uber and Lyft are readily available at the airport.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Attractions Section */}
      <section id="attractions" className="mb-16">
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-zinc-800">
          <div className="mb-6 text-center">
            <div className="bg-sage/10 mb-4 inline-flex items-center justify-center rounded-full p-3 dark:bg-amber-500/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-sage h-8 w-8 dark:text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-sage mb-3 font-serif text-xl dark:text-amber-500">
              Nearby Attractions
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Discover the beauty and excitement of the Snoqualmie Valley and
              greater Seattle area.
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg bg-gray-50 p-6 dark:bg-zinc-700">
              <h3 className="text-sage mb-4 font-serif text-xl dark:text-amber-500">
                Near the Venue
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-medium text-gray-900 dark:text-gray-100">
                    Natural Attractions
                  </h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                    <li className="flex items-start">
                      <svg
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0 dark:text-amber-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Snoqualmie Falls (2.5 mi)</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0 dark:text-amber-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Little Si trail (3.8 mi)</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0 dark:text-amber-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Mount Si Trail (7.9 mi)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-medium text-gray-900 dark:text-gray-100">
                    Local Attractions
                  </h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                    <li className="flex items-start">
                      <svg
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0 dark:text-amber-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Northwest Railway Museum</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0 dark:text-amber-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Snoqualmie Point Park</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0 dark:text-amber-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Snoqualmie Casino</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-6 dark:bg-zinc-700">
              <h3 className="text-sage mb-4 font-serif text-xl dark:text-amber-500">
                Within 1 Hour
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-medium text-gray-900 dark:text-gray-100">
                    Seattle Attractions
                  </h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                    <li className="flex items-start">
                      <svg
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0 dark:text-amber-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Pike Place Market</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0 dark:text-amber-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Gas Works Park</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0 dark:text-amber-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Seattle Aquarium</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-medium text-gray-900 dark:text-gray-100">
                    Wine Country
                  </h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                    <li className="flex items-start">
                      <svg
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0 dark:text-amber-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Chateau Ste. Michelle Winery</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-6 dark:bg-zinc-700">
              <h3 className="text-sage mb-4 font-serif text-xl dark:text-amber-500">
                Nightlife Options
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-medium text-gray-900 dark:text-gray-100">
                    Bars & Lounges
                  </h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                    <li className="flex items-start">
                      <svg
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0 dark:text-amber-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Cha Cha Lounge</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0 dark:text-amber-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>La Dive</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0 dark:text-amber-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>The Backdoor (speakeasy)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-medium text-gray-900 dark:text-gray-100">
                    More Options
                  </h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                    <li className="flex items-start">
                      <svg
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0 dark:text-amber-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Cowgirls</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0 dark:text-amber-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Kangaroo and Kiwi</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0 dark:text-amber-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Shingletown Saloon</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
