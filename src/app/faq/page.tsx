'use client'

import { useState } from 'react'
import WeatherForecast from '@/components/WeatherForecast'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqItems = [
    {
      question: 'What is the Dress Code?',
      answer: (
        <>
          <p className="text-gray-700 dark:text-gray-200">
            We&apos;re asking guests to dress in formal summer attire. Think
            elevated and elegant, but with comfort in mind—after all, it&apos;s
            July! Please note that white is reserved for the bride.
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
                <strong>For Men:</strong> Suits or tuxedos are encouraged but
                not required. A dress shirt with formal slacks and dress shoes
                is also perfectly appropriate. Ties are optional but
                recommended. Choose lightweight fabrics to stay cool in the
                summer heat.
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
                <strong>For Women:</strong> Long or cocktail dresses, elegant
                jumpsuits, or formal summer wear are perfect choices. Please
                avoid white, off-white, or cream colors. Opt for breathable
                fabrics to stay comfortable throughout the celebration.
              </span>
            </li>
          </ul>
          <p className="mt-4 text-gray-700 dark:text-gray-200">
            Please avoid casual clothing like jeans, shorts, or flip-flops.
          </p>
        </>
      ),
    },
    {
      question: 'Are Plus Ones Allowed?',
      answer: (
        <p className="text-gray-700 dark:text-gray-200">
          No. Only confirmed guests may attend. Plus ones and additional
          guests cannot be accommodated.
        </p>
      ),
    },
    {
      question: 'Are Kids Allowed?',
      answer: (
        <p className="text-gray-700 dark:text-gray-200">
          Yes! Children on the guest list are welcome. We&apos;ll have
          activities for kids, and we ask that parents keep an eye on little
          ones throughout the celebration.
        </p>
      ),
    },
    {
      question: 'What About Gifts?',
      answer: (
        <>
          <p className="text-gray-700 dark:text-gray-200">
            Your presence at our celebration is the greatest gift we could ask
            for! For those who wish to give a gift, we have a few preferences:
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
                We have set up a honeymoon fund and house fund for those who
                would like to contribute
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
                While not expected, thoughtful physical gifts brought to the
                celebration are also welcome
              </span>
            </li>
          </ul>
          <p className="mt-4 text-gray-700 dark:text-gray-200">
            Please know that your presence and well wishes are truly what matter
            most to us.
          </p>
        </>
      ),
    },
    {
      question: 'Where Can I Park?',
      answer: (
        <>
          <p className="text-gray-700 dark:text-gray-200">
            Parking at North Fork Farm is limited. Hotel guests can use the
            complimentary shuttle service from the Snoqualmie Inn Hotel for the
            most convenient experience.
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
                When parking at the venue, please see the attendant for
                directions.
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
                Upon arrival, continue past the venue on SE 79th St where a
                parking attendant will guide you to available spots
              </span>
            </li>
          </ul>
        </>
      ),
    },
    {
      question: 'Can I Take Photos During the Wedding?',
      answer: (
        <>
          <p className="text-gray-700 dark:text-gray-200">
            We kindly ask that no photos be taken during the ceremony to allow
            everyone to fully experience the moment.
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
              <span>Photos are welcome during the reception</span>
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
              <span>A photo booth will be available for fun memories</span>
            </li>
          </ul>
        </>
      ),
    },
    {
      question: 'What is the Weather Forecast?',
      answer: <WeatherForecast />,
    },
    {
      question: 'Will There Be Alcohol?',
      answer: (
        <>
          <p className="text-gray-700 dark:text-gray-200">
            Yes! We&apos;ll have bar service available offering a variety of
            drink options.
          </p>
          <p className="mt-4 text-gray-700 dark:text-gray-200">
            Please enjoy responsibly and pace yourself. We want everyone to have
            fun while staying safe.
          </p>
        </>
      ),
    },
    {
      question: 'What Food Options Will Be Available?',
      answer: (
        <>
          <p className="text-gray-700 dark:text-gray-200">
            We&apos;re excited to offer a delicious buffet-style meal featuring
            a variety of options to satisfy all tastes:
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
                <span>Perfectly prepared steak</span>
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
                <span>An array of seasonal sides and accompaniments</span>
              </li>
            </ul>
          </div>

        </>
      ),
    },
    {
      question: 'Need Help on Wedding Day?',
      answer: (
        <p className="text-gray-700 dark:text-gray-200">
          If you need help with directions, parking, or shuttle timing on
          Saturday, reach out to us by phone or text. For travel and schedule
          details, see our{' '}
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
          pages.
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
          Practical info for wedding weekend — Saturday, July 11, 2026.
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
