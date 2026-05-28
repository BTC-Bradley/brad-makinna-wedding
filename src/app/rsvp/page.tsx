import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RSVP | Bradley & MaKinna',
  description: 'RSVPs for our wedding are now closed.',
}

export default function RSVPPage() {
  return (
    <div className="to-sage/5 min-h-screen from-white dark:from-zinc-900 dark:to-zinc-800/50">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="text-sage mb-6 font-serif text-5xl font-light tracking-wide dark:text-amber-400">
            RSVP
          </h1>
          <div className="bg-sage/30 mx-auto mb-8 h-1 w-24 dark:bg-amber-400/30"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Thank you to everyone who responded!
          </p>
        </div>

        <div className="ring-sage/10 rounded-xl bg-white p-8 shadow-lg ring-1 dark:bg-zinc-800 dark:ring-zinc-700/40">
          <div className="space-y-6 text-center">
            <div className="bg-sage/20 mx-auto flex h-16 w-16 items-center justify-center rounded-full dark:bg-amber-400/30">
              <svg
                className="text-sage h-8 w-8 dark:text-amber-400"
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
            </div>
            <h3 className="text-sage text-2xl font-medium dark:text-amber-400">
              RSVPs Are Now Closed
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              The RSVP deadline of April 11th, 2026 has passed, so we&apos;re no
              longer accepting responses online.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              If you still need to reach us about your attendance, please contact
              us directly.
            </p>
            <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
              <a
                href="/travel"
                className="bg-sage hover:bg-sage/90 inline-block rounded-md px-6 py-3 text-base font-semibold text-gray-900 shadow-md dark:text-white"
              >
                View Travel Info
              </a>
              <a
                href="/schedule"
                className="inline-block rounded-md bg-gray-100 px-6 py-3 text-base font-semibold text-gray-700 shadow-md hover:bg-gray-200 dark:bg-zinc-700 dark:text-gray-300 dark:hover:bg-zinc-600"
              >
                View Schedule
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            If you have any questions, please don&apos;t hesitate to contact us.
          </p>
        </div>
      </div>
    </div>
  )
}
