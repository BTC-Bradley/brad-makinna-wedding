import { Metadata } from 'next';
import RSVPForm from '@/components/RSVPForm';

export const metadata: Metadata = {
  title: 'RSVP | MaKinna & Bradley',
  description: 'Please let us know if you will be joining us on our special day.',
};

export default function RSVPPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif text-sage mb-4">RSVP</h1>
        <p className="text-gray-600">
          We hope you can join us for our special day. Please respond by June 1st, 2026.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8">
        <RSVPForm />
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>If you have any questions, please don&apos;t hesitate to contact us.</p>
      </div>
    </div>
  );
} 