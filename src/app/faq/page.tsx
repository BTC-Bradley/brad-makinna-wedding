'use client'

import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqItems = [
    {
      question: "When Should I RSVP By?",
      answer: "TBD."
    },
    {
      question: "Is there a Dress Code?",
      answer: (
        <>
          <p className="text-gray-700 dark:text-gray-200">
            We&apos;re asking guests to dress in formal summer attire. Think
            elevated and elegant, but with comfort in mind—after all,
            it&apos;s July! Please note that white is reserved for the bride.
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
                <strong>For Men:</strong> Suits or tuxedos are encouraged but not required. A dress
                shirt with formal slacks and dress shoes is also perfectly
                appropriate. Ties are optional but recommended. Choose lightweight fabrics to stay cool in the summer heat.
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
                <strong>For Women:</strong> Long or cocktail dresses, elegant jumpsuits, or formal summer
                wear are perfect choices. Please avoid white, off-white, or cream colors. Opt for breathable fabrics to stay comfortable throughout the celebration.
              </span>
            </li>
          </ul>
          <p className="mt-4 text-gray-700 dark:text-gray-200">
            Please avoid casual clothing like jeans, shorts, or flip-flops.
          </p>
        </>
      )
    },
    {
      question: "Are plus ones allowed?",
      answer: (
        <>
          <p className="text-gray-700 dark:text-gray-200">
            To ensure an intimate celebration, we are strictly limiting attendance to invited guests only. Here&apos;s what you need to know:
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
              <span>Only guests listed on your invitation are welcome to attend</span>
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
              <span>Please RSVP only for the names specifically listed on your invitation</span>
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
              <span>Due to venue capacity restrictions, we cannot accommodate additional guests</span>
            </li>
          </ul>
          <p className="mt-4 text-gray-700 dark:text-gray-200">
            If you have any questions about your invitation, please don&apos;t hesitate to reach out to us directly.
          </p>
        </>
      )
    },
    {
      question: "Are Kids Allowed?",
      answer: (
        <>
          <p className="text-gray-700 dark:text-gray-200">
            We&apos;d love to have children join us for our special day! Please include all children in your RSVP so we can plan accordingly. To ensure everyone&apos;s enjoyment and safety, we have some gentle guidelines:
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
              <span>We kindly ask that parents keep an eye on their children throughout the celebration</span>
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
              <span>We&apos;ll have some fun activities available for children to enjoy with their families</span>
            </li>
          </ul>
        </>
      )
    },
    {
      question: "Gifts?",
      answer: (
        <>
          <p className="text-gray-700 dark:text-gray-200">
            Your presence at our celebration is the greatest gift we could ask for! For those who wish to give a gift, we have a few preferences:
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
              <span>We have set up a honeymoon fund and house fund for those who would like to contribute</span>
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
              <span>While not expected, thoughtful physical gifts brought to the celebration are also welcome</span>
            </li>
          </ul>
          <p className="mt-4 text-gray-700 dark:text-gray-200">
            Please know that your presence and well wishes are truly what matter most to us.
          </p>
        </>
      )
    },
    {
      question: "Parking",
      answer: (
        <>
          <p className="text-gray-700 dark:text-gray-200">
            Parking at North Fork Farm is limited. We strongly recommend using the shuttle service from the Snoqualmie Inn Hotel for the most convenient experience.
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
              <span>Upon arrival, continue past the venue on SE 79th St where a parking attendant will guide you to available spots</span>
            </li>
          </ul>
        </>
      )
    },
    {
      question: "Photo Policy",
      answer: (
        <>
          <p className="text-gray-700 dark:text-gray-200">
            We kindly ask that no photos be taken during the ceremony to allow everyone to fully experience the moment. However, feel free to take as many photos as you&apos;d like during the reception—we encourage you to capture and share the fun!
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
              <span>Please refrain from taking photos during the ceremony</span>
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
              <span>Feel free to take photos during the reception</span>
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
              <span>We&apos;ll have a photo booth available for fun memories with friends and family</span>
            </li>
          </ul>
        </>
      )
    },
    {
      question: "What is the Weather like in July?",
      answer: (
        <>
          <p className="text-gray-700 dark:text-gray-200">
            July in Snoqualmie is typically warm and dry, with daytime highs
            averaging between 73°F and 77°F and nighttime lows around 46°F to
            54°F. While it&apos;s a dry heat, there&apos;s always a small
            chance of rain—July sees an average of 1–2 days of rain during the
            July month, but it&apos;s usually light and short-lived.
          </p>
          <p className="mt-4 text-gray-700 dark:text-gray-200">
            We recommend dressing in lightweight, breathable fabrics to stay
            comfortable during the day. As temperatures can cool in the
            evening, consider bringing a light jacket or sweater to stay cozy
            after sunset.
          </p>
        </>
      )
    },
    {
      question: "Will there be alcohol?",
      answer: "Yes! We'll be serving drinks, so please enjoy responsibly and pace yourself. We want everyone to have fun while staying safe."
    },
    {
      question: "What Food options will be available?",
      answer: "We'll be offering a buffet-style meal featuring a seafood option, steak, and a variety of delicious sides. If you have any dietary restrictions, please reach out to us as soon as possible so we can accommodate your needs."
    },
    {
      question: "Who do I contact with questions?",
      answer: "If you have any questions, feel free to reach out to us directly! We're here to help and can't wait to celebrate with you."
    }
  ]

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-sage mb-4 font-serif text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Everything you need to know about our wedding day.
        </p>
      </div>

      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="rounded-lg bg-white shadow-sm dark:bg-gray-800 overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <h2 className="text-sage font-serif text-xl">
                {item.question}
              </h2>
              <svg
                className={`w-6 h-6 text-sage transform transition-transform ${
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
              <div className="p-6 pt-0">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
