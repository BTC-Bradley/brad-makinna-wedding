import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Story | Bradley & MaKinna',
  description: "The story of Bradley and MaKinna's journey together",
}

const timeline = [
  {
    date: '2021',
    title: 'Our First Hello',
    description:
      'Among thousands at a music festival at the Gorge Amphitheater, our paths crossed under the dazzling lights and lasers. Little did we know that this magical moment would be the beginning of our forever story.',
    image: '/images/gorge.jpg',
  },
  {
    date: '2022',
    title: 'Building Our Home',
    description:
      'Our home welcomed two tiny new heartbeats. Bringing Blaze and Ember into our lives was one of our most cherished decisions together, filling our days with endless purrs, cuddles, and unconditional love.',
    image: '/images/kitties.jpg',
  },
  {
    date: '2023',
    title: 'Our Love for Hiking',
    description:
      'Adventure called, and we answered together with our amazing friends. Countless mornings began with packed hydration and well-worn hiking boots as we explored nature alongside the people we love most. Our first backpacking trip with friends tested all our limits in the cold mountain air, but the breathtaking memories and shared laughter made every shivering moment worth it.',
    image: '/images/enchantments.jpg',
  },
  {
    date: '2024',
    title: 'A Year of Adventures',
    description:
      "A year painted with family joy, powder-filled slopes, and festival magic. Precious moments chasing nieces and nephews solidified Brad's reign as the favorite uncle, while the ski season brought its own adventures - MaKinna conquering her fears one slope at a time, and Brad mastering the art of patient encouragement.",
    image: '/images/bigfour.jpg',
  },
  {
    date: '2025',
    title: 'The Proposal',
    description:
      "The year our dreams aligned with destiny. Against the backdrop of a breathtaking Cabo sunset, Brad dropped to one knee on the warm sand and asked for MaKinna's hand in marriage. The golden orange sky seemed to celebrate as happy tears filled her eyes and she whispered the sweetest 'yes.'",
    image: '/images/proposal.jpg',
  },
  {
    date: '2026',
    title: 'Our Wedding Day',
    description:
      "The culmination of our love story becomes a celebration with those who mean the world to us. This incredible journey has led us here, and we couldn't be more thrilled to begin the beautiful adventure of marriage surrounded by our cherished friends and family.",
    image: '/images/northfork.jpg',
  },
]

export default function StoryPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-16 text-center">
        <h1 className="text-sage mb-6 font-serif text-5xl font-light tracking-wide dark:text-amber-400">
          Our Story
        </h1>
        <div className="bg-sage/30 mx-auto mb-8 h-1 w-24 dark:bg-amber-400/30"></div>
        <p className="text-gray-600 dark:text-gray-300">
          From chance encounter to forever, here&apos;s our journey together.
        </p>
      </div>

      <div className="relative min-h-[800px]">
        {/* Timeline line - using a different approach */}
        <div className="border-ocean dark:border-ocean-light absolute left-4 z-0 hidden h-full transform border-l-2 md:left-1/2 md:block md:-translate-x-1/2"></div>

        {/* Timeline items */}
        <div className="space-y-16">
          {timeline.map((item, index) => (
            <div
              key={item.date}
              className="relative flex flex-col items-start md:flex-row md:items-center"
            >
              {/* Content */}
              <div
                className={`w-full px-4 md:w-1/2 ${index % 2 === 0 ? 'md:pr-4 md:pl-8' : 'md:order-2 md:pr-8 md:pl-4'}`}
              >
                <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-zinc-800">
                  <span className="text-sage dark:text-sage-light font-serif text-lg">
                    {item.date}
                  </span>
                  <h3 className="text-sage dark:text-sage-light mt-2 mb-3 font-serif text-xl">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Image */}
              <div
                className={`mt-4 w-full px-4 md:mt-0 md:w-1/2 ${index % 2 === 0 ? '' : 'md:order-1'}`}
              >
                <div className="relative h-48 overflow-hidden rounded-lg md:h-64">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Timeline dot */}
              <div className="bg-sage dark:bg-sage-light absolute left-0 h-4 w-4 transform rounded-full md:left-1/2 md:-translate-x-1/2" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-gray-600 dark:text-gray-300">
          We can&apos;t wait to write the next chapter of our story with you.
        </p>
      </div>
    </div>
  )
}
