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
  const [step, setStep] = useState<'attendance' | 'confirm'>('attendance')

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

  const handleNextStep = () => {
    if (step === 'attendance' && isAttending !== null) {
      if (!isAttending) {
        // If not attending, select all guests and go to confirm
        setSelectedGuests([
          guestList.guest1,
          guestList.guest2,
          ...(guestList.additionalGuests || []),
        ])
      }
      setStep('confirm')
    }
  }

  const handleBackStep = () => {
    if (step === 'confirm') {
      setStep('attendance')
    }
  }

  if (step === 'attendance') {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900 dark:text-gray-100">
            Will anyone from your party be attending?
          </h2>
          <p className="mt-2 text-base text-gray-700 dark:text-gray-300">
            Please let us know if any members of your party will be joining us.
            <br />
            You&apos;ll be able to specify who is attending in the next step.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setIsAttending(true)}
              className={`flex-1 rounded-md px-4 py-3 text-base font-medium transition-all duration-200 border-2 cursor-pointer ${
                isAttending === true
                  ? 'bg-sage text-gray-900 border-sage dark:bg-sage/90 dark:text-white dark:border-sage/90'
                  : 'bg-white text-gray-900 hover:bg-gray-50 border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-700'
              }`}
            >
              Yes, some of us will attend
            </button>
            <button
              type="button"
              onClick={() => setIsAttending(false)}
              className={`flex-1 rounded-md px-4 py-3 text-base font-medium transition-all duration-200 border-2 cursor-pointer ${
                isAttending === false
                  ? 'bg-sage text-gray-900 border-sage dark:bg-sage/90 dark:text-white dark:border-sage/90'
                  : 'bg-white text-gray-900 hover:bg-gray-50 border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-700'
              }`}
            >
              No, none of us can attend
            </button>
          </div>
        </div>

        {isAttending === true && (
          <div className="mt-8">
            <GuestSelection
              guestList={guestList}
              onGuestSelectionChange={handleGuestSelectionChange}
              isAttending={isAttending}
            />
          </div>
        )}

        <button
          type="button"
          onClick={handleNextStep}
          disabled={
            isAttending === null || (isAttending && selectedGuests.length === 0)
          }
          className="bg-sage/90 hover:bg-sage focus:ring-sage w-full rounded-md px-6 py-4 text-lg font-semibold text-white shadow-md focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 dark:disabled:bg-gray-700 dark:disabled:text-gray-400 dark:disabled:hover:bg-gray-700 cursor-pointer"
        >
          {isAttending === null
            ? 'Please select an option'
            : isAttending && selectedGuests.length === 0
              ? 'Please select guests to continue'
              : 'Continue to Confirm'}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-medium text-gray-900 dark:text-gray-100">
          Confirm Details
        </h2>
        <p className="mt-2 text-base text-gray-700 dark:text-gray-300">
          Please review your RSVP details.
        </p>
      </div>

      <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-700">
        <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
          Selected Guests:
        </h3>
        <ul className="mt-2 space-y-1">
          {selectedGuests.map((guest) => (
            <li
              key={`${guest.firstName}-${guest.lastName}`}
              className="text-base text-gray-700 dark:text-gray-300"
            >
              {guest.title} {guest.firstName} {guest.lastName}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-700">
        <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
          Attendance Status:
        </h3>
        <p className="mt-2 text-base text-gray-700 dark:text-gray-300">
          {isAttending ? 'Will be attending' : 'Will not be attending'}
        </p>
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
            className="focus:border-sage focus:ring-sage mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-base dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="Please let us know if any of the selected guests have dietary restrictions or allergies"
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={handleBackStep}
          className="focus:ring-sage flex-1 rounded-md border border-gray-300 bg-white px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 cursor-pointer"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-sage hover:bg-sage/90 focus:ring-sage flex-1 rounded-md px-4 py-3 text-base font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 dark:disabled:bg-gray-700 dark:disabled:text-gray-400 dark:disabled:hover:bg-gray-700 cursor-pointer"
        >
          {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
        </button>
      </div>
    </form>
  )
}
