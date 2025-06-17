'use client'

import { useState } from 'react'
import type { GuestListDocument, Guest } from '@/interfaces/guest'

interface RSVPFormProps {
  guestList: GuestListDocument
}

interface GuestAttendance {
  guest: Guest
  isAttending: boolean | null
}

export default function RSVPForm({ guestList }: RSVPFormProps) {
  const [guestAttendance, setGuestAttendance] = useState<GuestAttendance[]>(
    () => {
      const allGuests = [
        guestList.guest1,
        guestList.guest2,
        ...(guestList.additionalGuests || []),
      ]
      return allGuests.map((guest) => ({ guest, isAttending: null }))
    },
  )
  const [dietaryRestrictions, setDietaryRestrictions] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAttendanceChange = (guest: Guest, isAttending: boolean) => {
    setGuestAttendance((prev) =>
      prev.map((ga) =>
        ga.guest.firstName === guest.firstName &&
        ga.guest.lastName === guest.lastName
          ? { ...ga, isAttending }
          : ga,
      ),
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const attendingGuests = guestAttendance
        .filter((ga) => ga.isAttending === true)
        .map((ga) => ga.guest)

      const notAttendingGuests = guestAttendance
        .filter((ga) => ga.isAttending === false)
        .map((ga) => ga.guest)

      // TODO: Implement the actual submission logic
      console.log({
        guestListId: guestList.id,
        attendingGuests,
        notAttendingGuests,
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

  const isFormValid = guestAttendance.every((ga) => ga.isAttending !== null)

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-medium text-gray-900 dark:text-gray-100">
          RSVP for Your Party
        </h2>
        <p className="mt-2 text-base text-gray-700 dark:text-gray-300">
          Please indicate whether each member of your party will be attending.
        </p>
      </div>

      <div className="space-y-6">
        {guestAttendance.map(({ guest, isAttending }) => (
          <div
            key={`${guest.firstName}-${guest.lastName}`}
            className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {guest.title} {guest.firstName} {guest.lastName}
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleAttendanceChange(guest, true)}
                className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isAttending === true
                    ? 'bg-sage text-gray-900 dark:text-white ring-2 ring-sage ring-offset-2 shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Attending
              </button>
              <button
                type="button"
                onClick={() => handleAttendanceChange(guest, false)}
                className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isAttending === false
                    ? 'bg-sage text-gray-900 dark:text-white ring-2 ring-sage ring-offset-2 shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Not Attending
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="dietary"
            className="block text-base font-medium text-gray-900 dark:text-gray-100"
          >
            Dietary Restrictions
          </label>
          <textarea
            id="dietary"
            name="dietary"
            rows={3}
            value={dietaryRestrictions}
            onChange={(e) => setDietaryRestrictions(e.target.value)}
            className="focus:border-sage focus:ring-sage mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-base dark:border-gray-600 dark:bg-gray-700 dark:text-white p-3"
            placeholder="Please let us know if any of the selected guests have dietary restrictions or allergies"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !isFormValid}
        className="bg-sage hover:bg-sage/90 focus:ring-sage w-full cursor-pointer rounded-md px-6 py-4 text-lg font-semibold text-white shadow-md focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 dark:disabled:bg-gray-700 dark:disabled:text-gray-400 dark:disabled:hover:bg-gray-700"
      >
        {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
      </button>
    </form>
  )
}
