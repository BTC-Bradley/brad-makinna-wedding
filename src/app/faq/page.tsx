'use client'

import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqItems = [
    {
      question: 'When Should I RSVP By?',
      answer: 'TBD.',
    },
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
        <>
          <p className="text-gray-700 dark:text-gray-200">
            To ensure an intimate celebration, we are strictly limiting
            attendance to invited guests only. Here&apos;s what you need to
            know:
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
                Only guests listed on your invitation are welcome to attend
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
                Please RSVP only for the names specifically listed on your
                invitation
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
                Due to venue capacity restrictions, we cannot accommodate
                additional guests
              </span>
            </li>
          </ul>
          <p className="mt-4 text-gray-700 dark:text-gray-200">
            If you have any questions about your invitation, please don&apos;t
            hesitate to reach out to us directly.
          </p>
        </>
      ),
    },
    {
      question: 'Are Kids Allowed?',
      answer: (
        <>
          <p className="text-gray-700 dark:text-gray-200">
            We&apos;d love to have children join us for our special day! Please
            include all children in your RSVP so we can plan accordingly. To
            ensure everyone&apos;s enjoyment and safety, we have some gentle
            guidelines:
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
                We kindly ask that parents keep an eye on their children
                throughout the celebration
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
                We&apos;ll have some fun activities available for children to
                enjoy with their families
              </span>
            </li>
          </ul>
        </>
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
            Parking at North Fork Farm is limited. We strongly recommend using
            the shuttle service from the Snoqualmie Inn Hotel for the most
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
              <span>If you plan to drive, please let us know in advance</span>
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
      question: 'What is the Weather Like in July?',
      answer: (
        <>
          <div className="mb-4 flex items-center gap-4">
            <svg
              className="text-sage h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <div>
              <p className="text-gray-700 dark:text-gray-200">
                Sunny and warm: 73°F-77°F during the day, cooling to 46°F-54°F
                at night.
              </p>
            </div>
          </div>
          <div className="mb-4 flex items-center gap-4">
            <svg
              className="text-sage h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              />
            </svg>
            <div>
              <p className="text-gray-700 dark:text-gray-200">
                Rain unlikely (1-2 days possible), typically brief if it occurs.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <svg
              className="text-sage h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
            <div>
              <p className="text-gray-700 dark:text-gray-200">
                Dress in lightweight fabrics and bring a light jacket for the
                evening.
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      question: 'Will There Be Alcohol?',
      answer: (
        <>
          <p className="text-gray-700 dark:text-gray-200">
            Yes! We&apos;ll have two bars available - one indoor and one outdoor
            - offering a variety of drink options:
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
              <span>Red and white wine selections</span>
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
              <span>Local craft cider</span>
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
              <span>Beer options</span>
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
              <span>Two signature cocktails</span>
            </li>
          </ul>
          <p className="mt-4 text-gray-700 dark:text-gray-200">
            Please enjoy responsibly and pace yourself. We want everyone to have
            fun while staying safe.
          </p>
          <p className="mt-2 text-gray-700 dark:text-gray-200">
            Note: Due to venue restrictions, only one round of shots will be
            served during the reception.
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
          <p className="mt-4 text-gray-700 dark:text-gray-200">
            Please indicate any dietary restrictions or allergies on your RSVP
            form.
          </p>
        </>
      ),
    },
    {
      question: 'Who Should I Contact With Questions?',
      answer: (
        <>
          <p className="text-gray-700 dark:text-gray-200">
            We&apos;re here to help with any questions you may have! Here are
            the best ways to reach us:
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
              <span>Reach out to us directly via phone or email</span>
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
                Use our{' '}
                <a
                  href="/contact"
                  className="text-sage hover:text-sage/80 underline"
                >
                  contact form
                </a>{' '}
                for a quick response
              </span>
            </li>
          </ul>
          <p className="mt-4 text-gray-700 dark:text-gray-200">
            We can&apos;t wait to celebrate with you and are happy to help with
            any questions!
          </p>
        </>
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
          Everything you need to know about our wedding day.
        </p>
      </div>

      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <h2 className="text-sage font-serif text-xl">{item.question}</h2>
              <svg
                className={`text-sage h-6 w-6 transform transition-transform ${
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
                openIndex === index ? 'max-h-[1000px]' : 'max-h-0'
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
