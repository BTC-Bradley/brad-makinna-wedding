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
      image: '/images/wedding-party/summer.jpg',
    },
    {
      name: 'Bri',
      role: 'Bridesmaid',
      image: '/images/wedding-party/bri2.jpg',
    },
    {
      name: 'Savannah',
      role: 'Bridesmaid',
      image: '/images/wedding-party/savannah.jpg',
    },
    {
      name: 'Tamia',
      role: 'Bridesmaid',
      image: '/images/wedding-party/tamia.jpg',
    },
    {
      name: 'Samantha',
      role: 'Bridesmaid',
      image: '/images/wedding-party/samantha.jpg',
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
      image: '/images/wedding-party/vish2.jpg',
    },
    {
      name: 'Chris',
      role: 'Groomsman',
      image: '/images/wedding-party/chris.jpg',
    },
    {
      name: 'Kevin',
      role: 'Groomsman',
      image: '/images/wedding-party/kevin1.jpg',
    },
    {
      name: 'Jonny',
      role: 'Groomsman',
      image: '/images/wedding-party/jonny.jpg',
    },
    {
      name: 'Kevin',
      role: 'Groomsman',
      image: '/images/wedding-party/kevin2.jpg',
    },
    {
      name: 'Aaron',
      role: 'Groomsman',
      image: '/images/wedding-party/aaron.jpg',
    },
    {
      name: 'Bryan',
      role: 'Groomsman',
      image: '/images/wedding-party/bryan.jpg',
    },
  ]

  useEffect(() => {
    const shuffledB = [...bridesmaids].sort(() => Math.random() - 0.5)
    const shuffledG = [...groomsmen].sort(() => Math.random() - 0.5)
    setShuffledBridesmaids(shuffledB)
    setShuffledGroomsmen(shuffledG)
  }, [])

  const WeddingPartyCard = ({ member }: { member: WeddingPartyMember }) => (
    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-zinc-100 dark:bg-zinc-800 dark:ring-zinc-700/40">
      <div className="relative mb-4 aspect-[3/4] w-full overflow-hidden rounded-lg">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
          sizes="(min-width: 640px) 50vw, 100vw"
        />
      </div>
      <h3 className="text-sage font-serif text-xl">{member.name}</h3>
      <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
        {member.role}
      </p>
    </div>
  )

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-sage mb-6 font-serif text-5xl font-light tracking-wide dark:text-amber-400">
          Wedding Party
        </h1>
        <div className="bg-sage/30 mx-auto mb-8 h-1 w-24 dark:bg-amber-400/30"></div>
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
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-3">
              {/* First row: Items 0, 1, 2 */}
              {shuffledBridesmaids.slice(0, 3).map((bridesmaid, index) => (
                <WeddingPartyCard key={`top-${index}`} member={bridesmaid} />
              ))}

              {/* Second row: Items 3, 4, 5 */}
              {shuffledBridesmaids.slice(3, 6).map((bridesmaid, index) => (
                <WeddingPartyCard key={`bottom-${index}`} member={bridesmaid} />
              ))}

              {/* Third row: Item 6 (last item, centered) */}
              <div className="hidden sm:block"></div>
              {shuffledBridesmaids[6] && (
                <WeddingPartyCard member={shuffledBridesmaids[6]} />
              )}
              <div className="hidden sm:block"></div>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div>
            <h2 className="text-sage mb-12 text-center font-serif text-3xl">
              Groomsmen
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-3">
              {/* First row: Items 0, 1, 2 */}
              {shuffledGroomsmen.slice(0, 3).map((groomsman, index) => (
                <WeddingPartyCard key={`top-${index}`} member={groomsman} />
              ))}

              {/* Second row: Items 3, 4, 5 */}
              {shuffledGroomsmen.slice(3, 6).map((groomsman, index) => (
                <WeddingPartyCard key={`bottom-${index}`} member={groomsman} />
              ))}

              {/* Third row: Item 6 (last item, centered) */}
              <div className="hidden sm:block"></div>
              {shuffledGroomsmen[6] && (
                <WeddingPartyCard member={shuffledGroomsmen[6]} />
              )}
              <div className="hidden sm:block"></div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
