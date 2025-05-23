import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Story | MaKinna & Bradley',
  description: "The story of Bradley and MaKinna's journey together",
}

const timeline = [
  {
    date: '2021',
    title: 'The Beginning',
    description:
      'Among thousands at a festival at the Gorge Amphitheater, destiny brought us together not once, but twice. Some call it coincidence, we call it fate.',
    image: '/images/gorge.jpg',
  },
  {
    date: '2022',
    title: 'Building Our Home',
    description:
      'We created our sanctuary together and welcomed our beloved kitties, Ember and Blaze, who became the heart of our home.',
    image: '/images/kitties.jpg',
  },
  {
    date: '2023',
    title: 'Hiking the Enchantments',
    description:
      'We embarked on a journey to the Enchantments, a place of beauty and adventure, where we found our love for nature and each other.',
    image: '/images/enchantments.jpg',
  },
  {
    date: '2025',
    title: 'The Proposal',
    description:
      'As waves crashed on the pristine beaches of Cabo, Bradley knelt down and asked the question that would change our lives forever.',
    image: '/images/proposal.jpg',
  },
  {
    date: '2026',
    title: 'Our Wedding Day',
    description:
      'Join us as we celebrate our love and begin our forever at the beautiful North Fork Farm, surrounded by family and friends.',
    image: '/images/northfork.jpg',
  },
]

export default function StoryPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-16 text-center">
        <h1 className="text-sage mb-4 font-serif text-4xl">Our Story</h1>
        <p className="text-gray-600">
          From chance encounter to forever, here&apos;s our journey together.
        </p>
      </div>

      <div className="relative min-h-[800px]">
        {/* Timeline line - using a different approach */}
        <div className="border-ocean absolute left-1/2 z-0 h-full -translate-x-1/2 transform border-l-2"></div>

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
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <span className="text-sage font-serif text-lg">
                    {item.date}
                  </span>
                  <h3 className="text-sage mt-2 mb-3 font-serif text-xl">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>

              {/* Image */}
              <div className="w-1/2 px-4">
                <div className="relative h-64 overflow-hidden rounded-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Timeline dot */}
              <div className="bg-sage absolute left-1/2 h-4 w-4 -translate-x-1/2 transform rounded-full" />
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
  )
}
