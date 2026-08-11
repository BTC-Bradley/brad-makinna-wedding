'use client'

import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqItems = [
    {
      question: 'What was the dress code?',
      answer: (
        <>
          <p className="text-gray-700 dark:text-gray-200">
            Guests were asked to dress in formal summer attire — elevated and
            elegant, with comfort in mind for July. White was reserved for the
            bride.
          </p>
          <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-200">
            <li className="flex items-start">
              <svg
                className="text-sage mr-2 h-5 w-5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>
                <strong>For men:</strong> Suits or tuxedos were encouraged but
                not required. A dress shirt with formal slacks and dress shoes
                was also appropriate. Ties were optional but recommended.
                Lightweight fabrics helped with the summer heat.
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="text-sage mr-2 h-5 w-5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>
                <strong>For women:</strong> Long or cocktail dresses, elegant
                jumpsuits, or formal summer wear. Guests were asked to avoid
                white, off-white, or cream, and to choose breathable fabrics.
              </span>
            </li>
          </ul>
          <p className="mt-4 text-gray-700 dark:text-gray-200">
            Casual clothing like jeans, shorts, or flip-flops was discouraged.
          </p>
        </>
      ),
    },
    {
      question: 'Were plus ones allowed?',
      answer: (
        <p className="text-gray-700 dark:text-gray-200">
          No. Only confirmed guests on the invitation could attend. Plus ones
          and additional guests could not be accommodated.
        </p>
      ),
    },
    {
      question: 'Were kids allowed?',
      answer: (
        <p className="text-gray-700 dark:text-gray-200">
          Yes — children on the guest list were welcome. Activities were
          available for kids, and parents were asked to keep an eye on little
          ones throughout the celebration.
        </p>
      ),
    },
    {
      question: 'What about gifts?',
      answer: (
        <>
          <p className="text-gray-700 dark:text-gray-200">
            Presence at the celebration was the greatest gift. For guests who
            wanted to give something extra, we shared a few preferences:
          </p>
          <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-200">
            <li className="flex items-start">
              <svg
                className="text-sage mr-2 h-5 w-5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>
                Honeymoon and home funds were available before the wedding (now
                closed on this archive)
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="text-sage mr-2 h-5 w-5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>
                Thoughtful physical gifts brought to the celebration were also
                welcome, though never expected
              </span>
            </li>
          </ul>
        </>
      ),
    },
    {
      question: 'Where could guests park?',
      answer: (
        <>
          <p className="text-gray-700 dark:text-gray-200">
            Parking at North Fork Farm was limited. Hotel guests could use the
            complimentary shuttle from the Snoqualmie Inn for the most
            convenient experience.
          </p>
          <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-200">
            <li className="flex items-start">
              <svg
                className="text-sage mr-2 h-5 w-5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>
                When parking at the venue, guests checked in with the attendant
                for directions.
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="text-sage mr-2 h-5 w-5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>
                On arrival, guests continued past the venue on SE 79th St, where
                a parking attendant guided them to available spots.
              </span>
            </li>
          </ul>
        </>
      ),
    },
    {
      question: 'Could guests take photos during the wedding?',
      answer: (
        <>
          <p className="text-gray-700 dark:text-gray-200">
            We asked that no guest photos be taken during the ceremony so
            everyone could be present in the moment.
          </p>
          <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-200">
            <li className="flex items-start">
              <svg
                className="text-sage mr-2 h-5 w-5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Photos were welcome during the reception</span>
            </li>
            <li className="flex items-start">
              <svg
                className="text-sage mr-2 h-5 w-5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>A photo booth was available for fun memories</span>
            </li>
          </ul>
        </>
      ),
    },
    {
      question: 'What about the weather?',
      answer: (
        <p className="text-gray-700 dark:text-gray-200">
          The wedding was outdoors-friendly at a Snoqualmie Valley farm in
          mid-July — typically warm summer weather. Guests planned for heat
          during the day and cooler air later in the evening. (Live forecast
          tools on the original site are not shown on this archive.)
        </p>
      ),
    },
    {
      question: 'Was there alcohol?',
      answer: (
        <>
          <p className="text-gray-700 dark:text-gray-200">
            Yes — bar service offered a variety of drink options.
          </p>
          <p className="mt-4 text-gray-700 dark:text-gray-200">
            Guests were asked to enjoy responsibly and pace themselves.
          </p>
        </>
      ),
    },
    {
      question: 'What food was available?',
      answer: (
        <>
          <p className="text-gray-700 dark:text-gray-200">
            Dinner was buffet-style with a variety of options:
          </p>
          <div className="mt-4">
            <h4 className="text-sage mb-2 font-serif text-lg dark:text-amber-400">
              Cocktail Hour
            </h4>
            <ul className="mb-4 space-y-2 text-gray-700 dark:text-gray-200">
              <li className="flex items-start">
                <svg
                  className="text-sage mr-2 h-5 w-5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Fresh oysters</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="text-sage mr-2 h-5 w-5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Charcuterie board</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sage mb-2 font-serif text-lg dark:text-amber-400">
              Dinner
            </h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-200">
              <li className="flex items-start">
                <svg
                  className="text-sage mr-2 h-5 w-5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Fresh seafood selection</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="text-sage mr-2 h-5 w-5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Steak</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="text-sage mr-2 h-5 w-5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Seasonal sides and accompaniments</span>
              </li>
            </ul>
          </div>
        </>
      ),
    },
    {
      question: 'Where can I find travel and schedule details?',
      answer: (
        <p className="text-gray-700 dark:text-gray-200">
          The original guest guidance for directions, parking, and shuttle
          timing is preserved on the{' '}
          <a
            href="/travel"
            className="text-sage hover:text-sage/80 underline dark:text-amber-400 dark:hover:text-amber-300"
          >
            Travel
          </a>{' '}
          and{' '}
          <a
            href="/schedule"
            className="text-sage hover:text-sage/80 underline dark:text-amber-400 dark:hover:text-amber-300"
          >
            Schedule
          </a>{' '}
          pages of this archive.
        </p>
      ),
    },
  ]

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-sage mb-6 font-serif text-5xl font-light tracking-wide dark:text-amber-400">
          Frequently Asked Questions
        </h1>
        <div className="bg-sage/30 mx-auto mb-8 h-1 w-24 dark:bg-amber-400/30"></div>
        <p className="text-gray-600 dark:text-gray-300">
          What guests needed to know for wedding weekend — Saturday, July 11,
          2026. Preserved as a historical record.
        </p>
      </div>

      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-zinc-800"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50 dark:hover:bg-zinc-700"
            >
              <h2 className="text-sage font-serif text-xl dark:text-amber-400">
                {item.question}
              </h2>
              <svg
                className={`text-sage h-6 w-6 transform transition-transform dark:text-amber-400 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-[5000px]' : 'max-h-0'
              }`}
            >
              <div className="p-6 pt-0">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
