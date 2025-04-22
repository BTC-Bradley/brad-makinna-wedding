import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | MaKinna & Bradley',
  description: 'Get in touch with Bradley and Makinna for any questions about their wedding.',
};

export default function ContactPage() {
  return <ContactForm />;
} 