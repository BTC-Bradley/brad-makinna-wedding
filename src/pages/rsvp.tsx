import Head from 'next/head';
import Layout from '../components/layout/Layout';
import RSVPForm from '../components/RSVPForm';

export default function RSVP() {
  return (
    <Layout>
      <Head>
        <title>RSVP | Bradley & MaKinna</title>
        <meta name="description" content="RSVP for Bradley and MaKinna's wedding on July 11, 2026" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-sage mb-4">RSVP</h1>
          <p className="text-gray-600">
            Please respond by May 15, 2026
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <RSVPForm />
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Having trouble with the RSVP form? Please email us at{' '}
            <a href="mailto:wedding@bradleyandmakinna.com" className="text-sage hover:text-earth">
              wedding@bradleyandmakinna.com
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
} 