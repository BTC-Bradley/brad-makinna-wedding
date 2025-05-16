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
        <h2 className="text-sage mb-6 text-center font-serif text-2xl">
          Hotel Information
        </h2>
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.177940618123!2d-121.87261232308931!3d47.529523371182755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54907ea44820fd21%3A0x9ff3fd9e370e4074!2sSnoqualmie%20Inn%20by%20Hotel%20America!5e1!3m2!1sen!2sus!4v1747366093807!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="p-6">
            <h3 className="text-sage mb-2 font-serif text-xl">
              Snoqualmie Inn by Hotel America
            </h3>
            <p className="mb-4 text-gray-600">
              We have reserved a block of rooms at the Snoqualmie Inn by Hotel
              America.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                <strong>Booking Code:</strong> VHWD12
              </p>
              <div className="space-y-4">
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
        </div>
      </section>

      {/* Parking Section */}
      <section className="mb-16">
        <h2 className="text-sage mb-6 text-center font-serif text-2xl">
          Parking Information
        </h2>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <p className="mb-4 text-gray-600">
            Parking at the venue is limited and will be restricted to:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li>Disabled or elderly guests</li>
            <li>Immediate family</li>
            <li>Parents with children</li>
            <li>The wedding party</li>
            <li>Guests who reach out to let us know</li>
          </ul>
        </div>
      </section>

      {/* Shuttle Section */}
      <section className="mb-16">
        <h2 className="text-sage mb-6 text-center font-serif text-2xl">
          Shuttle Service
        </h2>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <p className="mb-4 text-gray-600">
            There is a reserved shuttle to and from the Snoqualmie Inn Hotel
            that will take you to and from the venue during the times listed
            below. Please be aware that:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li>The shuttle can hold 14 people maximum</li>
            <li>Each trip takes approximately 30 minutes</li>
            <li>Please allow yourself ample time to be on time</li>
          </ul>
        </div>
      </section>

      {/* Airport Section */}
      <section className="mb-16">
        <h2 className="text-sage mb-6 text-center font-serif text-2xl">
          Airport Information
        </h2>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <p className="text-gray-600">
            SeaTac International Airport is the closest airport to the venue.
          </p>
        </div>
      </section>

      {/* Nearby Attractions Section */}
      <section className="mb-16">
        <h2 className="text-sage mb-6 text-center font-serif text-2xl">
          Nearby Attractions
        </h2>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="space-y-6">
            <div>
              <h3 className="text-sage mb-3 font-serif text-xl">
                Near the Venue
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>Snoqualmie Falls</li>
                <li>Little Si trail (3.8 mi)</li>
                <li>Mount Si Trail (7.9 mi)</li>
                <li>Northwest Railway Museum</li>
                <li>Snoqualmie Point Park</li>
                <li>Snoqualmie Casino</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sage mb-3 font-serif text-xl">
                Within 1 Hour
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>Pikes Place Market</li>
                <li>Gas Works Park</li>
                <li>Seattle Aquarium</li>
                <li>Chateau Ste. Michelle Winery</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sage mb-3 font-serif text-xl">
                Nightlife Options
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>Cha Cha lounge</li>
                <li>Cowgirls</li>
                <li>La Dive</li>
                <li>The Backdoor (speakeasy)</li>
                <li>Kangaroo and Kiwi</li>
                <li>Shingletown Saloon</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
