import { Metadata } from 'next'
import RSVPForm from '@/components/RSVPForm'

export const metadata: Metadata = {
  title: 'RSVP | MaKinna & Bradley',
  description:
    'Please let us know if you will be joining us on our special day.',
}

export default function RSVPPage() {
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
        <RSVPForm />
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          If you have any questions, please don&apos;t hesitate to contact us.
        </p>
      </div>
    </div>
  )
}
