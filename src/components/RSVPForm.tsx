'use client';

import { useState } from 'react';

interface RSVPFormData {
  guestName: string;
  email: string;
  attending: boolean;
  numberOfGuests: number;
  dietaryRestrictions: string;
  message: string;
}

export default function RSVPForm() {
  const [formData, setFormData] = useState<RSVPFormData>({
    guestName: '',
    email: '',
    attending: true,
    numberOfGuests: 1,
    dietaryRestrictions: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: checkbox.checked });
    } else if (type === 'number') {
      setFormData({ ...formData, [name]: parseInt(value) || 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          guestName: '',
          email: '',
          attending: true,
          numberOfGuests: 1,
          dietaryRestrictions: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error('Error submitting RSVP:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div>
        <label htmlFor="guestName" className="block text-sm font-medium text-gray-700">
          Full Name *
        </label>
        <input
          type="text"
          id="guestName"
          name="guestName"
          required
          value={formData.guestName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sage focus:ring-sage"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sage focus:ring-sage"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Will you be attending? *
        </label>
        <div className="mt-2 space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="attending-yes"
              name="attending"
              checked={formData.attending}
              onChange={() => setFormData({ ...formData, attending: true })}
              className="h-4 w-4 text-sage focus:ring-sage border-gray-300"
            />
            <label htmlFor="attending-yes" className="ml-3 block text-sm font-medium text-gray-700">
              Yes, I will attend
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="attending-no"
              name="attending"
              checked={!formData.attending}
              onChange={() => setFormData({ ...formData, attending: false })}
              className="h-4 w-4 text-sage focus:ring-sage border-gray-300"
            />
            <label htmlFor="attending-no" className="ml-3 block text-sm font-medium text-gray-700">
              No, I cannot attend
            </label>
          </div>
        </div>
      </div>

      {formData.attending && (
        <>
          <div>
            <label htmlFor="numberOfGuests" className="block text-sm font-medium text-gray-700">
              Number of Guests *
            </label>
            <select
              id="numberOfGuests"
              name="numberOfGuests"
              required
              value={formData.numberOfGuests}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sage focus:ring-sage"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div>
            <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700">
              Dietary Restrictions
            </label>
            <input
              type="text"
              id="dietaryRestrictions"
              name="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={handleChange}
              placeholder="e.g., Vegetarian, Gluten-free, etc."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sage focus:ring-sage"
            />
          </div>
        </>
      )}

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message (Optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sage focus:ring-sage"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage hover:bg-earth focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
        </button>
      </div>

      {submitStatus === 'success' && (
        <div className="rounded-md bg-green-50 p-4">
          <div className="text-sm text-green-700">
            Thank you for your RSVP! We look forward to celebrating with you.
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">
            There was an error submitting your RSVP. Please try again or contact us directly.
          </div>
        </div>
      )}
    </form>
  );
} 