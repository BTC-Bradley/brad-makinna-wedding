import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Seating Chart | Bradley & MaKinna',
  description:
    'Interactive seating chart for the Bradley & MaKinna wedding reception — July 11, 2026.',
  openGraph: {
    title: 'Seating Chart | Bradley & MaKinna',
    description:
      'Interactive seating chart for the Bradley & MaKinna wedding reception.',
    type: 'website',
  },
}

export default function SeatingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
