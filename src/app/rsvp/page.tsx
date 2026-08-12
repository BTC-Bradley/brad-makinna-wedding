import { Metadata } from 'next'
import RSVPForm from '@/components/RSVPForm'
import ErrorState from '@/components/ErrorState'
import RSVPCodeInput from '@/components/RSVPCodeInput'
import type { GuestListDocument } from '@/interfaces/guest'
import { headers } from 'next/headers'
import { DEMO_SAMPLE_CODES } from '@/data/demo-guests'

export const metadata: Metadata = {
  title: 'RSVP | Bradley & MaKinna',
  description:
    'Interactive portfolio demo of the archived wedding RSVP system (sample data only).',
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
            The real RSVP period closed before the wedding. This page is an
            interactive demo of how the system worked.
          </p>
        </div>

        <div className="mb-8 rounded-xl border border-amber-300/60 bg-amber-50 p-5 text-left shadow-sm dark:border-amber-400/30 dark:bg-amber-400/10">
          <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
            Archive · RSVP demo
          </p>
          <p className="mt-1 text-sm text-amber-900/90 dark:text-amber-100/90">
            Real guest data has been removed. In this demo,{' '}
            <strong>any 6-character code</strong> using the invitation alphabet
            (2–9, A–F) opens a fictional party so you can try the full RSVP
            flow. Enter one below, or use a curated scenario:
          </p>
          {!searchParams.id && (
            <ul className="mt-3 space-y-1.5 text-sm text-amber-950 dark:text-amber-50">
              {DEMO_SAMPLE_CODES.map(({ code, label }) => (
                <li key={code} className="flex flex-wrap items-baseline gap-2">
                  <a
                    href={`/rsvp?id=${code}`}
                    className="font-mono font-semibold underline decoration-amber-500/50 underline-offset-2 hover:decoration-amber-600"
                  >
                    {code}
                  </a>
                  <span className="text-amber-900/80 dark:text-amber-100/80">
                    — {label}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {searchParams.id && (
            <p className="mt-3 text-sm text-amber-900/80 dark:text-amber-100/80">
              <a
                href="/rsvp"
                className="font-medium underline underline-offset-2"
              >
                ← Back to sample codes
              </a>
            </p>
          )}
          <p className="mt-4 border-t border-amber-300/40 pt-4 text-sm text-amber-900/90 dark:border-amber-400/20 dark:text-amber-100/90">
            We also built a matching <strong>RSVP admin dashboard</strong> for
            tracking parties by list, attendance, and dietary needs — also demo
            data only:{' '}
            <a
              href="https://brad-makinna-wedding-rsvp.vercel.app/rsvps"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline decoration-amber-500/50 underline-offset-2 hover:decoration-amber-600"
            >
              Open RSVP admin demo →
            </a>
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
                In demo mode, some sample parties are pre-submitted so you can
                see this state. Try another code, or restart the dev server to
                reset in-memory demo RSVPs.
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
            Originally powered by Next.js, TypeScript, and Azure Cosmos DB —
            this archive uses in-memory sample data only.
          </p>
        </div>
      </div>
    </div>
  )
}
