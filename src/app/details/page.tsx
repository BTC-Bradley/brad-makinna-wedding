import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wedding Details | Bradley & MaKinna',
  description: "Details about Bradley and MaKinna's wedding celebration",
}

export default function DetailsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-sage mb-4 font-serif text-4xl">Wedding Details</h1>
        <p className="text-gray-600">Join us for our special day</p>
      </div>

      {/* Schedule Section */}
      {/* <section className="mb-16">
        <h2 className="text-2xl font-serif text-sage mb-6 text-center">Schedule</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Ceremony</span>
              <span className="text-gray-600">4:00 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Cocktail Hour</span>
              <span className="text-gray-600">5:00 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Reception</span>
              <span className="text-gray-600">6:00 PM</span>
            </div>
          </div>
        </div>
      </section> */}

      {/* Venue Section */}
      <section className="mb-16">
        <h2 className="text-sage mb-6 text-center font-serif text-2xl">
          Venue
        </h2>
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373631531973!3d-37.817327679751734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnviroserve!5e0!3m2!1sen!2sus!4v1635167261304!5m2!1sen!2sus"
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
              North Fork Farm
            </h3>
            <p className="mb-4 text-gray-600">
              [Venue Address TBD]
              <br />
              [City, State ZIP]
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                <strong>Attire:</strong> Semi-formal, outdoor-friendly
              </p>
              <p className="text-sm text-gray-500">
                <strong>Parking:</strong> Available on-site
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section>
        <h2 className="text-sage mb-6 text-center font-serif text-2xl">
          Additional Information
        </h2>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <h3 className="text-sage mb-2 font-medium">Weather</h3>
              <p className="text-gray-600">
                The ceremony and reception will be held outdoors. Please check
                the weather forecast and dress accordingly. In case of inclement
                weather, the event will be moved indoors.
              </p>
            </div>
            <div>
              <h3 className="text-sage mb-2 font-medium">Photography</h3>
              <p className="text-gray-600">
                We encourage guests to take photos during the reception, but we
                ask that phones be put away during the ceremony.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
