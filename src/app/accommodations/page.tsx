import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accommodations | MaKinna & Bradley',
  description: 'Information about accommodations and travel for Bradley and MaKinna\'s wedding',
};

const hotels = [
  {
    name: 'Hotel Placeholder 1',
    description: 'A charming boutique hotel with rustic elegance, located 10 minutes from the venue.',
    address: '[Address TBD]',
    phone: '[Phone TBD]',
    website: '#',
    bookingLink: '#',
    priceRange: '$$$',
  },
  {
    name: 'Hotel Placeholder 2',
    description: 'A modern hotel with comfortable amenities, located 15 minutes from the venue.',
    address: '[Address TBD]',
    phone: '[Phone TBD]',
    website: '#',
    bookingLink: '#',
    priceRange: '$$',
  },
  {
    name: 'Hotel Placeholder 3',
    description: 'A cozy inn with a homey feel, located 20 minutes from the venue.',
    address: '[Address TBD]',
    phone: '[Phone TBD]',
    website: '#',
    bookingLink: '#',
    priceRange: '$$',
  },
];

const attractions = [
  {
    name: 'Local Attraction 1',
    description: 'A beautiful park with hiking trails and scenic views.',
    distance: '5 minutes from venue',
  },
  {
    name: 'Local Attraction 2',
    description: 'A historic downtown area with shops and restaurants.',
    distance: '15 minutes from venue',
  },
  {
    name: 'Local Attraction 3',
    description: 'A local winery offering tours and tastings.',
    distance: '20 minutes from venue',
  },
];

export default function AccommodationsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif text-sage mb-4">Accommodations</h1>
        <p className="text-gray-600">
          We&apos;ve selected some wonderful places for you to stay during our celebration.
        </p>
      </div>

      {/* Hotels Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-serif text-sage mb-6 text-center">Recommended Hotels</h2>
        <div className="space-y-6">
          {hotels.map((hotel) => (
            <div key={hotel.name} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-serif text-sage mb-2">{hotel.name}</h3>
                  <p className="text-gray-600 mb-4">{hotel.description}</p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>{hotel.address}</p>
                    <p>{hotel.phone}</p>
                    <p>Price Range: {hotel.priceRange}</p>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <a
                    href={hotel.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sage hover:text-earth"
                  >
                    Visit Website
                  </a>
                  <a
                    href={hotel.bookingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-sage  px-4 py-2 rounded-md hover:bg-earth transition-colors"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Transportation Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-serif text-sage mb-6 text-center">Transportation</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Shuttle Service</h3>
              <p className="text-gray-600">
                A shuttle service will be provided between the hotels and the venue.
                Schedule and details will be available closer to the date.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Parking</h3>
              <p className="text-gray-600">
                Parking at North Fork Farm is limited. We encourage guests to use our shuttle service from the Snoqualmie Inn Hotel for convenience. Please see the Travel page for shuttle service details.
              </p>
              <p className="mt-2 text-gray-600">
                When arriving at the venue, continue straight past the venue on SE 79th St. A parking attendant will be there to help direct you to available parking spaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Local Attractions Section */}
      <section>
        <h2 className="text-2xl font-serif text-sage mb-6 text-center">Local Attractions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {attractions.map((attraction) => (
            <div key={attraction.name} className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-serif text-sage mb-2">{attraction.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{attraction.description}</p>
              <p className="text-gray-500 text-sm">{attraction.distance}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 