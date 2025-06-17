import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us | Bradley & MaKinna',
  description:
    'Get in touch with Bradley and MaKinna for any questions about their wedding.',
}

export default function ContactPage() {
  return <ContactForm />
}
