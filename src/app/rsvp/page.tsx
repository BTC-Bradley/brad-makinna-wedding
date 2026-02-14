import { Metadata } from 'next'
import RSVPForm from '@/components/RSVPForm'
import ErrorState from '@/components/ErrorState'
import RSVPCodeInput from '@/components/RSVPCodeInput'
import type { GuestListDocument } from '@/interfaces/guest'
import { headers } from 'next/headers'

export const metadata: Metadata = {
  title: 'RSVP | Bradley & MaKinna',
  description:
    'Please let us know if you will be joining us on our special day.',
}

async function getGuestList(id: string): Promise<GuestListDocument> {
  const headersList = headers()
  const host = headersList.get('host')
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'

  const res = await fetch(`${protocol}://${host}/api/guest/${id}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('Guest list not found. Please check your RSVP ID.')
    }
    throw new Error('Failed to fetch guest list')
  }

  return res.json()
}

async function checkExistingRSVP(guestId: string): Promise<boolean> {
  const headersList = headers()
  const host = headersList.get('host')
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'

  try {
    const res = await fetch(`${protocol}://${host}/api/rsvp/check/${guestId}`, {
      cache: 'no-store',
    })
    if (res.ok) {
      const data = await res.json()
      return data.submitted === true
    }
  } catch {
    // Fall through — don't block the form if check fails
  }
  return false
}

export default async function RSVPPage({
  searchParams,
}: {
  searchParams: { id?: string }
}) {
  let guestList: GuestListDocument | null = null
  let errorMessage: string | null = null
  let alreadySubmitted = false

  if (searchParams.id) {
    try {
      guestList = await getGuestList(searchParams.id)
      if (guestList) {
        alreadySubmitted = await checkExistingRSVP(guestList.id)
      }
    } catch (error) {
      errorMessage =
        error instanceof Error
          ? error.message
          : 'Unable to load guest information. Please try again later.'
    }
  }

  return (
    <div className="to-sage/5 min-h-screen from-white dark:from-zinc-900 dark:to-zinc-800/50">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="text-sage mb-6 font-serif text-5xl font-light tracking-wide dark:text-amber-400">
            RSVP
          </h1>
          <div className="bg-sage/30 mx-auto mb-8 h-1 w-24 dark:bg-amber-400/30"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We joyfully invite you to share in our celebration of love.
            <br />
            Please respond by April 11th, 2026.
          </p>
        </div>

        <div className="ring-sage/10 rounded-xl bg-white p-8 shadow-lg ring-1 dark:bg-zinc-800 dark:ring-zinc-700/40">
          {errorMessage ? (
            <ErrorState message={errorMessage} />
          ) : alreadySubmitted ? (
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
                Thank You!
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                We&apos;ve received your RSVP. Thank you for letting us know!
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                If you need to make changes, please reach out to us directly.
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
          ) : guestList ? (
            <RSVPForm guestList={guestList} />
          ) : (
            <RSVPCodeInput />
          )}
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
