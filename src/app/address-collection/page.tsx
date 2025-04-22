import { Metadata } from 'next'
import AddressCollectionForm from '@/components/AddressCollectionForm'

export const metadata: Metadata = {
  title: 'Address Collection | MaKinna & Bradley Hanson',
  description:
    'Submit your address to receive our save the date and wedding invitation',
}

export default function AddressCollectionPage() {
  return (
    <section className="bg-ivory min-h-screen py-16">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="text-sage mb-8 text-center font-serif text-3xl">
          Address Collection
        </h1>
        <div className="rounded-lg bg-white p-8 shadow-md">
          <p className="mb-8 text-center text-gray-700">
            Please provide your address so we can send you our save the date and
            wedding invitation.
          </p>
          <AddressCollectionForm />
        </div>
      </div>
    </section>
  )
}
