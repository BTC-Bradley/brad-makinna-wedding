import { Metadata } from 'next'
import { FadeIn } from '@/components/FadeIn'

export const metadata: Metadata = {
  title: 'Gallery | Bradley & MaKinna',
  description:
    'Photos from our wedding journey — ceremony, reception, and all the memories in between.',
}

// Masonry tiles with sage/amber/warm gradient combos
const galleryTiles = [
  // Row 1 — tall, wide, normal
  { id: 1, gradient: 'from-[#9CAF88] to-[#7a9268]', span: 'row-span-2', label: 'The Venue' },
  { id: 2, gradient: 'from-[#F4D03F] to-[#e8b84b]', span: '', label: 'Getting Ready' },
  { id: 3, gradient: 'from-[#c8a97e] to-[#a8845a]', span: 'row-span-2', label: 'The Ceremony' },
  // Row 2
  { id: 4, gradient: 'from-[#d4c5a9] to-[#b8a48a]', span: '', label: 'First Look' },
  { id: 5, gradient: 'from-[#9CAF88]/80 to-[#c8d9be]', span: '', label: 'Florals' },
  // Row 3 — wide, normal, tall
  { id: 6, gradient: 'from-[#e8c99a] to-[#c8a56e]', span: 'col-span-2', label: 'Reception' },
  { id: 7, gradient: 'from-[#7a9268] to-[#9CAF88]', span: 'row-span-2', label: 'The Dance' },
  // Row 4
  { id: 8, gradient: 'from-[#F4D03F]/70 to-[#9CAF88]/70', span: '', label: 'Wedding Party' },
  { id: 9, gradient: 'from-[#c4b5a0] to-[#e8ddd0]', span: '', label: 'Details' },
  // Row 5
  { id: 10, gradient: 'from-[#9CAF88] to-[#d4c5a9]', span: '', label: 'Portraits' },
  { id: 11, gradient: 'from-[#e0c88c] to-[#c8a56e]', span: 'col-span-2', label: 'The Toast' },
  // Row 6
  { id: 12, gradient: 'from-[#a8c49e] to-[#7a9268]', span: 'row-span-2', label: 'Sunset' },
  { id: 13, gradient: 'from-[#f0dfc0] to-[#d4b896]', span: '', label: 'Cake' },
  { id: 14, gradient: 'from-[#9CAF88]/60 to-[#F4D03F]/60', span: '', label: 'Bouquet' },
  // Row 7
  { id: 15, gradient: 'from-[#c8b49a] to-[#a8845a]', span: '', label: 'Send-off' },
  { id: 16, gradient: 'from-[#e8d5b8] to-[#c0a47c]', span: '', label: 'Just Married' },
]

function GalleryTile({
  gradient,
  span,
  label,
}: {
  gradient: string
  span: string
  label: string
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${gradient} ${span} min-h-[160px] group cursor-pointer`}
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-white/5 mix-blend-overlay" />

      {/* Shimmer pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.15) 10px, rgba(255,255,255,0.15) 20px)',
        }}
      />

      {/* Label on hover */}
      <div className="absolute inset-0 flex items-end justify-start p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-white text-sm font-sans font-medium tracking-wide drop-shadow-md bg-black/20 px-2 py-1 rounded-md backdrop-blur-sm">
          {label}
        </span>
      </div>

      {/* Camera icon placeholder */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-0 transition-opacity duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>
    </div>
  )
}

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      {/* Header */}
      <FadeIn>
        <div className="mb-14 text-center">
          <h1 className="text-sage mb-6 font-serif text-5xl font-light tracking-wide dark:text-amber-400">
            Gallery
          </h1>
          <div className="bg-sage/30 mx-auto mb-8 h-1 w-24 dark:bg-amber-400/30" />
          <p className="text-gray-500 dark:text-gray-400 font-sans">
            Our memories, captured — a preview of what&apos;s to come.
          </p>
        </div>
      </FadeIn>

      {/* Coming Soon Banner */}
      <FadeIn>
        <div className="relative mb-12 overflow-hidden rounded-2xl border border-[#9CAF88]/30 bg-gradient-to-r from-[#9CAF88]/10 via-[#F4D03F]/10 to-[#c8a97e]/10 px-8 py-10 text-center shadow-sm dark:border-[#9CAF88]/20 dark:bg-gradient-to-r dark:from-[#9CAF88]/5 dark:via-[#F4D03F]/5 dark:to-[#c8a97e]/5">
          {/* Decorative floral icon */}
          <div className="mb-4 flex justify-center">
            <span className="text-4xl select-none">🌿</span>
          </div>
          <h2 className="mb-2 font-serif text-2xl font-light text-[#9CAF88] dark:text-amber-400">
            Photos coming soon
          </h2>
          <p className="font-sans text-sm text-gray-500 dark:text-gray-400">
            We&apos;re so excited to share our wedding photos with you. Check back after{' '}
            <span className="font-semibold text-[#9CAF88] dark:text-amber-400">
              July 2026
            </span>{' '}
            — we&apos;ll fill this gallery with all the moments we can&apos;t wait for you to see.
          </p>
        </div>
      </FadeIn>

      {/* Masonry Grid */}
      <FadeIn>
        <div
          className="relative grid gap-3"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridAutoRows: '160px',
          }}
        >
          {/* Frosted overlay over the whole grid */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl backdrop-blur-[2px] bg-white/30 dark:bg-zinc-900/30 pointer-events-none">
            <div className="rounded-xl bg-white/80 dark:bg-zinc-800/80 px-8 py-5 text-center shadow-lg ring-1 ring-[#9CAF88]/20 backdrop-blur-sm">
              <p className="font-serif text-xl text-[#9CAF88] dark:text-amber-400 mb-1">
                ✦ Photos Coming Soon ✦
              </p>
              <p className="font-sans text-xs text-gray-400 dark:text-gray-500 tracking-wide">
                Check back after July 2026
              </p>
            </div>
          </div>

          {galleryTiles.map((tile) => (
            <GalleryTile
              key={tile.id}
              gradient={tile.gradient}
              span={tile.span}
              label={tile.label}
            />
          ))}
        </div>
      </FadeIn>

      {/* Footer note */}
      <FadeIn>
        <p className="mt-10 text-center font-sans text-xs text-gray-400 dark:text-gray-600">
          Photography by our amazing photographer ·{' '}
          <span className="text-[#9CAF88] dark:text-amber-400">July 26, 2026</span>
        </p>
      </FadeIn>
    </div>
  )
}
