import { FadeIn } from '@/components/FadeIn'
import Image from 'next/image'

export default function WeddingParty() {
  const bridesmaids = [
    { name: 'Bridesmaid 1', role: 'Bridesmaid', image: '/images/wedding-party/bridesmaid-1.jpg' },
    { name: 'Bridesmaid 2', role: 'Bridesmaid', image: '/images/wedding-party/bridesmaid-2.jpg' },
    { name: 'Bridesmaid 3', role: 'Bridesmaid', image: '/images/wedding-party/bridesmaid-3.jpg' },
    { name: 'Bridesmaid 4', role: 'Bridesmaid', image: '/images/wedding-party/bridesmaid-4.jpg' },
    { name: 'Bridesmaid 5', role: 'Bridesmaid', image: '/images/wedding-party/bridesmaid-5.jpg' },
    { name: 'Bridesmaid 6', role: 'Bridesmaid', image: '/images/wedding-party/bridesmaid-6.jpg' },
    { name: 'Bridesmaid 7', role: 'Bridesmaid', image: '/images/wedding-party/bridesmaid-7.jpg' },
  ]

  const groomsmen = [
    { name: 'Groomsman 1', role: 'Groomsman', image: '/images/wedding-party/groomsman-1.jpg' },
    { name: 'Groomsman 2', role: 'Groomsman', image: '/images/wedding-party/groomsman-2.jpg' },
    { name: 'Groomsman 3', role: 'Groomsman', image: '/images/wedding-party/groomsman-3.jpg' },
    { name: 'Groomsman 4', role: 'Groomsman', image: '/images/wedding-party/groomsman-4.jpg' },
    { name: 'Groomsman 5', role: 'Groomsman', image: '/images/wedding-party/groomsman-5.jpg' },
    { name: 'Groomsman 6', role: 'Groomsman', image: '/images/wedding-party/groomsman-6.jpg' },
    { name: 'Groomsman 7', role: 'Groomsman', image: '/images/wedding-party/groomsman-7.jpg' },
  ]

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-sage mb-4 font-serif text-4xl">
          Wedding Party
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Meet the wonderful people who will be standing by our side on our special day.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <FadeIn>
          <div>
            <h2 className="text-sage mb-8 text-center font-serif text-2xl">
              Bridesmaids
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {bridesmaids.map((bridesmaid, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-zinc-100 dark:bg-zinc-800 dark:ring-zinc-700/40"
                >
                  <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-lg">
                    <Image
                      src={bridesmaid.image}
                      alt={bridesmaid.name}
                      fill
                      className="object-cover"
                      sizes="(min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <h3 className="text-sage font-serif text-lg">{bridesmaid.name}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{bridesmaid.role}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div>
            <h2 className="text-sage mb-8 text-center font-serif text-2xl">
              Groomsmen
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {groomsmen.map((groomsman, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-zinc-100 dark:bg-zinc-800 dark:ring-zinc-700/40"
                >
                  <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-lg">
                    <Image
                      src={groomsman.image}
                      alt={groomsman.name}
                      fill
                      className="object-cover"
                      sizes="(min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <h3 className="text-sage font-serif text-lg">{groomsman.name}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{groomsman.role}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  )
} 