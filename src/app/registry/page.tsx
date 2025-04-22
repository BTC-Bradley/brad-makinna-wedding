import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registry | MaKinna & Bradley',
  description: 'Registry information for Bradley and MaKinna\'s wedding',
};

export default function RegistryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif text-sage mb-4">Registry</h1>
        <p className="text-gray-600">
          Your presence at our wedding is the greatest gift of all.
          <br />
          However, if you wish to honor us with a gift, we&apos;ve registered at the following stores:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <h2 className="text-xl font-serif text-sage mb-4">Zola</h2>
          <p className="text-gray-600 mb-4">
            Browse our curated collection of home goods, kitchen essentials, and more.
          </p>
          <a
            href="https://www.zola.com/registry/bradleyandmakinna"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-sage text-white px-6 py-2 rounded-md hover:bg-earth transition-colors"
          >
            View Registry
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <h2 className="text-xl font-serif text-sage mb-4">Amazon</h2>
          <p className="text-gray-600 mb-4">
            Find a wide selection of items for our new home together.
          </p>
          <a
            href="https://www.amazon.com/wedding/registry/bradleyandmakinna"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-sage text-white px-6 py-2 rounded-md hover:bg-earth transition-colors"
          >
            View Registry
          </a>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-serif text-sage mb-6 text-center">Honeymoon Fund</h2>
        <p className="text-gray-600 text-center mb-6">
          If you&apos;d like to contribute to our honeymoon adventures, we&apos;ve set up a honeymoon fund.
          Your generosity will help us create unforgettable memories together.
        </p>
        <div className="text-center">
          <a
            href="https://www.honeyfund.com/bradleyandmakinna"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-sage text-white px-6 py-2 rounded-md hover:bg-earth transition-colors"
          >
            Contribute to Our Honeymoon
          </a>
        </div>
      </div>

      <div className="mt-12 text-center text-sm text-gray-500">
        <p>
          Questions about our registry? Please email us at{' '}
          <a href="mailto:wedding@bradleyandmakinna.com" className="text-sage hover:text-earth">
            wedding@bradleyandmakinna.com
          </a>
        </p>
      </div>
    </div>
  );
} 