'use client'

import { FadeIn } from '@/components/FadeIn'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type WeddingPartyMember = {
  name: string
  role: string
  image: string
}

export default function WeddingParty() {
  const [shuffledBridesmaids, setShuffledBridesmaids] = useState<
    WeddingPartyMember[]
  >([])
  const [shuffledGroomsmen, setShuffledGroomsmen] = useState<
    WeddingPartyMember[]
  >([])

  const bridesmaids: WeddingPartyMember[] = [
    {
      name: 'Zainab',
      role: 'Bridesmaid',
      image: '/images/wedding-party/zainab.jpg',
    },
    {
      name: 'Summer',
      role: 'Bridesmaid',
      image: '/images/wedding-party/bridesmaid-7.jpg',
    },
    { name: 'Bri', role: 'Bridesmaid', image: '/images/wedding-party/bri2.jpg' },
    {
      name: 'Savannah',
      role: 'Bridesmaid',
      image: '/images/wedding-party/bridesmaid-6.jpg',
    },
    {
      name: 'Tamia',
      role: 'Bridesmaid',
      image: '/images/wedding-party/bridesmaid-4.jpg',
    },
    {
      name: 'Samantha',
      role: 'Bridesmaid',
      image: '/images/wedding-party/bridesmaid-5.jpg',
    },
    {
      name: 'Cheyanne',
      role: 'Bridesmaid',
      image: '/images/wedding-party/cheyanne.jpg',
    },
  ]

  const groomsmen: WeddingPartyMember[] = [
    {
      name: 'Vish',
      role: 'Groomsman',
      image: '/images/wedding-party/vish.jpg',
    },
    {
      name: 'Chris',
      role: 'Groomsman',
      image: '/images/wedding-party/chris.jpg',
    },
    {
      name: 'Kevin',
      role: 'Groomsman',
      image: '/images/wedding-party/groomsman-3.jpg',
    },
    {
      name: 'Jonny',
      role: 'Groomsman',
      image: '/images/wedding-party/groomsman-4.jpg',
    },
    {
      name: 'Groomsman 5',
      role: 'Groomsman',
      image: '/images/wedding-party/groomsman-5.jpg',
    },
    {
      name: 'Groomsman 6',
      role: 'Groomsman',
      image: '/images/wedding-party/groomsman-6.jpg',
    },
    {
      name: 'Groomsman 7',
      role: 'Groomsman',
      image: '/images/wedding-party/groomsman-7.jpg',
    },
  ]

  useEffect(() => {
    const shuffledB = [...bridesmaids].sort(() => Math.random() - 0.5)
    const shuffledG = [...groomsmen].sort(() => Math.random() - 0.5)
    setShuffledBridesmaids(shuffledB)
    setShuffledGroomsmen(shuffledG)
  }, [])

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-sage mb-4 font-serif text-4xl">Wedding Party</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Meet the wonderful people who will be standing by our side on our
          special day.
        </p>
      </div>

      <div className="space-y-24">
        <FadeIn>
          <div>
            <h2 className="text-sage mb-12 text-center font-serif text-3xl">
              Bridesmaids
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {shuffledBridesmaids.map((bridesmaid, index) => (
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
                  <h3 className="text-sage font-serif text-xl">
                    {bridesmaid.name}
                  </h3>
                  <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                    {bridesmaid.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div>
            <h2 className="text-sage mb-12 text-center font-serif text-3xl">
              Groomsmen
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {shuffledGroomsmen.map((groomsman, index) => (
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
                  <h3 className="text-sage font-serif text-xl">
                    {groomsman.name}
                  </h3>
                  <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                    {groomsman.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
