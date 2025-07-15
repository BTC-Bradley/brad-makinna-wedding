import { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface LayoutProps {
  children: ReactNode
}

const navigation = [
  { href: '/', name: 'Home' },
  { href: '/story', name: 'Our Story' },
  { href: '/schedule', name: 'Schedule' },
  { href: '/travel', name: 'Travel' },
  { href: '/wedding-party', name: 'Wedding Party' },
  { href: '/faq', name: 'FAQ' },
  { href: '/rsvp', name: 'RSVP' },
  { href: '/gifts', name: 'Gifts' },
]

export default function Layout({ children }: LayoutProps) {
  const router = useRouter()

  return (
    <div className="bg-ivory min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 shadow-sm backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <Link href="/" className="text-sage font-serif text-2xl">
                  B & M
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      router.pathname === item.href
                        ? 'border-sage text-sage'
                        : 'hover:border-sage hover:text-sage border-transparent text-gray-500'
                    } inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-sage mt-16">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm">
              Bradley & MaKinna Hanson
              <br />
              July 11, 2026 • North Fork Farm
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
