import { Metadata } from 'next'
import RSVPForm from '@/components/RSVPForm'
import ErrorState from '@/components/ErrorState'
import type { GuestListDocument } from '@/interfaces/guest'
import { headers } from 'next/headers'

export const metadata: Metadata = {
  title: 'RSVP | MaKinna & Bradley',
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
      errorMessage = error instanceof Error ? error.message : 'Unable to load guest information. Please try again later.'
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-sage mb-4 font-serif text-4xl">RSVP</h1>
        <p className="text-gray-600">
          We hope you can join us for our special day. Please respond by June
          1st, 2026.
        </p>
      </div>

      <div className="rounded-lg bg-white p-8 shadow-sm">
        {errorMessage ? (
          <ErrorState message={errorMessage} />
        ) : guestList ? (
          <RSVPForm guestList={guestList} />
        ) : (
          <form action="/rsvp" method="get" className="space-y-4">
            <div>
              <label
                htmlFor="id"
                className="block text-sm font-medium text-gray-700"
              >
                Enter your RSVP ID
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="id"
                  id="id"
                  required
                  className="focus:border-sage focus:ring-sage block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  placeholder="Enter the RSVP ID from your invitation"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                You can find your RSVP ID on your invitation.
              </p>
            </div>
            <div>
              <button
                type="submit"
                className="bg-sage hover:bg-sage/90 focus:ring-sage w-full rounded-md px-4 py-2 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                Find My Invitation
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          If you have any questions, please don&apos;t hesitate to contact us.
        </p>
      </div>
    </div>
  )
}
