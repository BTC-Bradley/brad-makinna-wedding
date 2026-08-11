import Link from 'next/link'

/**
 * Site-wide notice: the wedding has already happened; this is a historical
 * archive + portfolio demo of the guest website.
 */
export function ArchiveBanner() {
  return (
    <div className="pointer-events-auto relative z-[60] border-b border-amber-300/50 bg-amber-50 text-amber-950 dark:border-amber-400/30 dark:bg-zinc-900 dark:text-amber-100">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-1 px-4 py-2.5 text-center text-sm sm:flex-row sm:gap-3 sm:px-6 lg:px-8">
        <p className="font-medium">
          Archive · Bradley &amp; MaKinna were married July 11, 2026
        </p>
        <span
          className="hidden text-amber-400 sm:inline dark:text-amber-500/80"
          aria-hidden="true"
        >
          ·
        </span>
        <p className="text-amber-900/90 dark:text-amber-100/85">
          This site is kept as a record of our wedding website.{' '}
          <Link
            href="/rsvp"
            className="font-semibold underline decoration-amber-500/50 underline-offset-2 hover:decoration-amber-600"
          >
            RSVP is a demo only
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
