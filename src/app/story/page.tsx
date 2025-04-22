import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story | Bradley & MaKinna',
  description: 'The story of Bradley and MaKinna\'s journey together',
};

const timeline = [
  {
    date: '2018',
    title: 'The Beginning',
    description: 'Our paths crossed in a serendipitous moment that would change our lives forever.',
    image: '/images/story-1.jpg',
  },
  {
    date: '2020',
    title: 'Moving In Together',
    description: 'We took the next step in our journey by creating a home together.',
    image: '/images/story-2.jpg',
  },
  {
    date: '2024',
    title: 'The Proposal',
    description: 'On a beautiful beach in Cabo, Bradley got down on one knee and asked the question that would begin our forever.',
    image: '/images/story-3.jpg',
  },
  {
    date: '2026',
    title: 'The Wedding',
    description: 'Join us as we celebrate our love and begin our new chapter together at North Fork Farm.',
    image: '/images/story-4.jpg',
  },
];

export default function StoryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif text-sage mb-4">Our Story</h1>
        <p className="text-gray-600">
          From chance encounter to forever, here&apos;s our journey together.
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-sage/20" />

        {/* Timeline items */}
        <div className="space-y-16">
          {timeline.map((item, index) => (
            <div
              key={item.date}
              className={`relative flex ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              } items-center`}
            >
              {/* Content */}
              <div className="w-1/2 px-4">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <span className="text-sage font-serif text-lg">{item.date}</span>
                  <h3 className="text-xl font-serif text-sage mt-2 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>

              {/* Image */}
              <div className="w-1/2 px-4">
                <div className="relative aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-sage rounded-full" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-gray-600">
          We can&apos;t wait to write the next chapter of our story with you.
        </p>
      </div>
    </div>
  );
} 