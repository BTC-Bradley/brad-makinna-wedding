'use client'

import { useState } from 'react'
import type { GuestListDocument, Guest } from '@/interfaces/guest'
import GuestSelection from './GuestSelection'

interface RSVPFormProps {
  guestList: GuestListDocument
}

export default function RSVPForm({ guestList }: RSVPFormProps) {
  const [selectedGuests, setSelectedGuests] = useState<Guest[]>([])
  const [isAttending, setIsAttending] = useState<boolean | null>(null)
  const [dietaryRestrictions, setDietaryRestrictions] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleGuestSelectionChange = (guests: Guest[]) => {
    setSelectedGuests(guests)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // TODO: Implement the actual submission logic
      console.log({
        guestListId: guestList.id,
        selectedGuests,
        isAttending,
        dietaryRestrictions,
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show success message or redirect
    } catch (error) {
      console.error('Error submitting RSVP:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <GuestSelection
        guestList={guestList}
        onGuestSelectionChange={handleGuestSelectionChange}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">
          Will you be attending?
        </h3>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setIsAttending(true)}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium ${
              isAttending === true
                ? 'bg-sage text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Yes, I&apos;ll be there
          </button>
          <button
            type="button"
            onClick={() => setIsAttending(false)}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium ${
              isAttending === false
                ? 'bg-sage text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            No, I can&apos;t make it
          </button>
        </div>
      </div>

      {isAttending && (
        <div className="space-y-4">
          <div>
            <label
              htmlFor="dietary"
              className="block text-sm font-medium text-gray-700"
            >
              Dietary Restrictions
            </label>
            <textarea
              id="dietary"
              name="dietary"
              rows={3}
              value={dietaryRestrictions}
              onChange={(e) => setDietaryRestrictions(e.target.value)}
              className="focus:border-sage focus:ring-sage mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              placeholder="Please let us know if you have any dietary restrictions or allergies"
            />
          </div>
        </div>
      )}

      <div className="pt-4">
        <button
          type="submit"
          disabled={
            isSubmitting || isAttending === null || selectedGuests.length === 0
          }
          className="bg-sage hover:bg-sage/90 focus:ring-sage w-full rounded-md px-4 py-2 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
        </button>
      </div>
    </form>
  )
}
