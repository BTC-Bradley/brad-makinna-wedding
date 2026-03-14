import Link from 'next/link'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found | Bradley & MaKinna',
  description: 'This page has eloped. Head back home.',
}

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
      {/* Big romantic emoji moment */}
      <div className="mb-6 text-7xl">💍</div>

      <p className="font-serif text-lg font-semibold text-amber-600 dark:text-amber-400 tracking-widest uppercase">
        404
      </p>

      <h1 className="mt-3 font-serif text-4xl font-light tracking-wide text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        This page has eloped.
      </h1>

      <p className="mt-5 max-w-md text-base text-zinc-500 dark:text-zinc-400">
        It ran off with someone on the guest list and didn&apos;t leave a
        forwarding address. Don&apos;t worry — the wedding is still on. 🥂
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-amber-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
        >
          🏡 Back to the wedding
        </Link>
        <Link
          href="/rsvp"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition-all hover:bg-zinc-100 hover:scale-105 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2"
        >
          💌 RSVP
        </Link>
      </div>
    </div>
  )
}
