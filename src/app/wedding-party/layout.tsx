import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wedding Party | Bradley & MaKinna',
  description:
    'Meet the bridesmaids and groomsmen standing by our side on our special day — July 11, 2026.',
  openGraph: {
    title: 'Wedding Party | Bradley & MaKinna',
    description:
      'Meet the bridesmaids and groomsmen standing by Bradley & MaKinna on their wedding day.',
    type: 'website',
  },
}

export default function WeddingPartyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
