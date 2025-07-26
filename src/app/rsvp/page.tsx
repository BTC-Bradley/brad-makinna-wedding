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

export default async function RSVPPage({
  searchParams,
}: {
  searchParams: { id?: string }
}) {
  let guestList: GuestListDocument | null = null
  let errorMessage: string | null = null

  if (searchParams.id) {
    try {
      guestList = await getGuestList(searchParams.id)
    } catch (error) {
      errorMessage =
        error instanceof Error
          ? error.message
          : 'Unable to load guest information. Please try again later.'
    }
  }

  return (
    <div className="min-h-screen from-white to-sage/5 dark:from-zinc-900 dark:to-zinc-800/50">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="text-sage mb-6 font-serif text-5xl font-light tracking-wide dark:text-amber-400">
            RSVP
          </h1>
          <div className="mx-auto mb-8 h-1 w-24 bg-sage/30 dark:bg-amber-400/30"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            We joyfully invite you to share in our celebration of love.
            <br />
            Please respond by April 11th, 2026.
          </p>
        </div>

        <div className="rounded-xl bg-white dark:bg-gray-800 p-8 shadow-lg ring-1 ring-sage/10 dark:ring-zinc-700/40">
          {errorMessage ? (
            <ErrorState message={errorMessage} />
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
