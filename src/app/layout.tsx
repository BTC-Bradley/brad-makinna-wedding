import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - MaKinna & Bradley Wedding',
    default: 'MaKinna & Bradley Wedding',
  },
  description:
    'Join us in celebrating our special day. We are excited to share our wedding journey with you.',
  icons: {
    icon: [
      {
        url: '/images/avatar.jpg',
        type: 'image/jpeg',
      },
    ],
    apple: [
      {
        url: '/images/avatar.jpg',
        type: 'image/jpeg',
      },
    ],
  },
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
