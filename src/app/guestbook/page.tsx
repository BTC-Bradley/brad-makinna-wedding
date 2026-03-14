import { Metadata } from 'next'
import { FadeIn } from '@/components/FadeIn'
import GuestbookClient from './GuestbookClient'

export const metadata: Metadata = {
  title: 'Guestbook | Bradley & MaKinna',
  description:
    'Leave a heartfelt message for Bradley & MaKinna on their wedding day.',
}

interface GuestbookEntry {
  id: string
  name: string
  message: string
  submittedAt: string
  approved: boolean
}

async function getEntries(): Promise<GuestbookEntry[]> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000')

    const res = await fetch(`${baseUrl}/api/guestbook`, {
      next: { revalidate: 30 },
    })

    if (!res.ok) return []
    const data = await res.json()
    return data.entries ?? []
  } catch {
    return []
  }
}

export default async function GuestbookPage() {
  const entries = await getEntries()

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fdfaf6] to-[#f5f0e8] pt-24">
      {/* Hero header */}
      <FadeIn>
        <div className="mx-auto mb-12 max-w-3xl px-4 text-center sm:px-6">
          {/* Decorative divider */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#9CAF88]/60" />
            <span className="text-2xl">💌</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#9CAF88]/60" />
          </div>

          <h1 className="mb-4 font-serif text-4xl font-bold text-gray-800 sm:text-5xl">
            Guestbook
          </h1>
          <p className="mx-auto max-w-xl font-sans text-base leading-relaxed text-gray-500">
            We&apos;d love to hear from you. Leave us a note — whether it&apos;s
            a warm wish, a piece of advice, or a favourite memory — we&apos;ll
            treasure every word.
          </p>

          {/* Decorative leaf line */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="h-px w-24 bg-[#9CAF88]/30" />
            <span className="font-script text-[#9CAF88]">✦</span>
            <div className="h-px w-24 bg-[#9CAF88]/30" />
          </div>
        </div>
      </FadeIn>

      {/* Client interactive section */}
      <GuestbookClient initialEntries={entries} />
    </main>
  )
}
