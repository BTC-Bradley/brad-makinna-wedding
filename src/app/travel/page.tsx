export default function TravelPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-sage mb-4 font-serif text-4xl">
          Travel Information
        </h1>
        <p className="text-gray-600">
          Everything you need to know about getting to and around Snoqualmie.
        </p>
      </div>

      {/* Hotel Section */}
      <section className="mb-16">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-6 text-center">
            <div className="bg-sage/10 mb-4 inline-flex items-center justify-center rounded-full p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-sage h-8 w-8"
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
            <h3 className="text-sage mb-3 font-serif text-xl">
              Snoqualmie Inn by Hotel America
            </h3>
            <p className="text-gray-600">
              We have reserved a block of rooms at the Snoqualmie Inn by Hotel
              America for your convenience.
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg bg-gray-50 p-6">
              <h4 className="text-sage mb-4 font-serif text-lg">
                Contact Information
              </h4>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Address:</span> 35228 Snoqualmie
                  Pkwy, Snoqualmie, WA 98065
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Phone:</span>{' '}
                  <a
                    href="tel:+14253633888"
                    className="text-sage hover:text-sage/80 transition-colors"
                  >
                    (425) 363-3888
                  </a>
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Website:</span>{' '}
                  <a
                    href="https://www.thehotelamerica.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sage hover:text-sage/80 transition-colors"
                  >
                    www.thehotelamerica.com
                  </a>
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-6">
              <h4 className="text-sage mb-4 font-serif text-lg">
                Booking Information
              </h4>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Booking Code:</span> VHWD12
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Booking Deadline:</span> June
                  10, 2026
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-6">
              <h4 className="text-sage mb-4 font-serif text-lg">
                Hotel Amenities
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <svg
                    className="text-sage mr-2 h-5 w-5 flex-shrink-0"
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
                  <span>Indoor swimming pool</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="text-sage mr-2 h-5 w-5 flex-shrink-0"
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
                  <span>Complimentary breakfast</span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <a
                href="https://book.rguest.com/onecart/wbe/room/1566/HotelAmerica/2026-07-10/2026-07-12/VHWD12/1"
                target="_blank"
                rel="noopener noreferrer"
                className="border-sage text-sage hover:bg-sage/10 inline-block w-full rounded-md border-2 bg-white px-6 py-3 text-center text-base font-medium transition-colors"
              >
                Book Your Room
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Shuttle Section */}
      <section className="mb-16">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-6 text-center">
            <div className="bg-sage/10 mb-4 inline-flex items-center justify-center rounded-full p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-sage h-8 w-8"
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
            <h3 className="text-sage mb-3 font-serif text-xl">
              Complimentary Hotel Shuttle Service
            </h3>
            <p className="text-gray-600">
              We&apos;re pleased to offer a free shuttle service between the
              Snoqualmie Inn Hotel and the venue.
            </p>
          </div>

          <div className="mb-6 rounded-lg bg-gray-50 p-6">
            <h4 className="text-sage mb-4 font-serif text-lg">
              Why Take the Shuttle?
            </h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <svg
                  className="text-sage mr-2 h-6 w-6 flex-shrink-0"
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
                <span>Completely free for all wedding guests</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="text-sage mr-2 h-6 w-6 flex-shrink-0"
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
                  className="text-sage mr-2 h-6 w-6 flex-shrink-0"
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

          <div className="mb-6 rounded-lg bg-gray-50 p-6">
            <h4 className="text-sage mb-4 font-serif text-lg">
              Shuttle Schedule
            </h4>
            <div className="space-y-6">
              <div>
                <h5 className="mb-3 font-medium text-gray-900">
                  Departure Trip (Hotel → North Fork Farm)
                </h5>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <svg
                      className="text-sage mr-2 h-6 w-6 flex-shrink-0"
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
                    <span>2:30 PM - 2:45 PM</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="text-sage mr-2 h-6 w-6 flex-shrink-0"
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
                    <span>3:30 PM - 3:45 PM</span>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="mb-3 font-medium text-gray-900">
                  Return Trip (North Fork Farm → Hotel)
                </h5>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <svg
                      className="text-sage mr-2 h-6 w-6 flex-shrink-0"
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
                    <span>8:00 PM - 8:15 PM</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="text-sage mr-2 h-6 w-6 flex-shrink-0"
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
                    <span>8:30 PM - 8:45 PM</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 p-6">
            <h4 className="text-sage mb-4 font-serif text-lg">
              Important Information
            </h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <svg
                  className="text-sage mr-2 h-6 w-6 flex-shrink-0"
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
                  className="text-sage mr-2 h-6 w-6 flex-shrink-0"
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
                  className="text-sage mr-2 h-6 w-6 flex-shrink-0"
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
            <p className="text-gray-600 italic">
              We strongly encourage all guests to utilize our shuttle service
              for a stress-free celebration experience.
            </p>
          </div>
        </div>
      </section>

      {/* Parking Section */}
      <section className="mb-16">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-6 text-center">
            <div className="bg-sage/10 mb-4 inline-flex items-center justify-center rounded-full p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-sage h-8 w-8"
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
            <h3 className="text-sage mb-3 font-serif text-xl">
              Parking at North Fork Farm
            </h3>
            <p className="text-gray-600">
              Limited parking is available at the venue. We encourage guests to
              use our shuttle service for convenience.
            </p>
          </div>
          <div className="mb-6">
            <img
              src="/images/parking.jpg"
              alt="Venue parking area"
              className="w-full rounded-lg object-cover"
            />
          </div>
          <div className="mb-6 rounded-lg bg-gray-50 p-6">
            <h4 className="text-sage mb-4 font-serif text-lg">
              Important Information
            </h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <svg
                  className="text-sage mr-2 h-6 w-6 flex-shrink-0"
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
                  className="text-sage mr-2 h-6 w-6 flex-shrink-0"
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
                <span>Please let us know in advance if you plan to drive</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-gray-50 p-6">
            <h4 className="text-sage mb-4 font-serif text-lg">
              Parking Directions
            </h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <svg
                  className="text-sage mr-2 h-6 w-6 flex-shrink-0"
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
                <p className="text-gray-700">
                  When arriving at the venue, continue straight past the venue
                  on SE 79th St. A parking attendant will be there to help
                  direct you to available parking spaces.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 italic">
              For the most convenient experience, we recommend using our shuttle
              service from the Snoqualmie Inn Hotel.
            </p>
          </div>
        </div>
      </section>

      {/* Airport Section */}
      <section className="mb-16">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-6 text-center">
            <div className="bg-sage/10 mb-4 inline-flex items-center justify-center rounded-full p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-sage h-8 w-8"
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
            <h3 className="text-sage mb-3 font-serif text-xl">
              SeaTac International Airport
            </h3>
            <p className="text-gray-600">
              The closest major airport to the venue, located approximately 45
              minutes away.
            </p>
          </div>

          <div className="mb-6 rounded-lg bg-gray-50 p-6">
            <h4 className="text-sage mb-4 font-serif text-lg">
              Transportation Options
            </h4>
            <div className="space-y-4">
              <div>
                <h5 className="mb-2 font-medium text-gray-900">Rental Cars</h5>
                <p className="text-gray-700">
                  All major rental car companies are available at SeaTac
                  Airport.
                </p>
              </div>
              <div>
                <h5 className="mb-2 font-medium text-gray-900">Rideshare</h5>
                <p className="text-gray-700">
                  Uber and Lyft are readily available at the airport.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Attractions Section */}
      <section className="mb-16">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-6 text-center">
            <div className="bg-sage/10 mb-4 inline-flex items-center justify-center rounded-full p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-sage h-8 w-8"
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
            <h3 className="text-sage mb-3 font-serif text-xl">
              Nearby Attractions
            </h3>
            <p className="text-gray-600">
              Discover the beauty and excitement of the Snoqualmie Valley and
              greater Seattle area.
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="text-sage mb-4 font-serif text-xl">
                Near the Venue
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-medium text-gray-900">
                    Natural Attractions
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <svg
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0"
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
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0"
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
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0"
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
                  <h4 className="mb-2 font-medium text-gray-900">
                    Local Attractions
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <svg
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0"
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
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0"
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
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0"
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

            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="text-sage mb-4 font-serif text-xl">
                Within 1 Hour
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-medium text-gray-900">
                    Seattle Attractions
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <svg
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0"
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
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0"
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
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0"
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
                  <h4 className="mb-2 font-medium text-gray-900">
                    Wine Country
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <svg
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0"
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

            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="text-sage mb-4 font-serif text-xl">
                Nightlife Options
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-medium text-gray-900">
                    Bars & Lounges
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <svg
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0"
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
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0"
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
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0"
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
                  <h4 className="mb-2 font-medium text-gray-900">
                    More Options
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <svg
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0"
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
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0"
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
                        className="text-sage mr-2 h-5 w-5 flex-shrink-0"
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
