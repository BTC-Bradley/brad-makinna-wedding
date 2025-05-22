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
  const [step, setStep] = useState<'attendance' | 'select' | 'confirm'>('attendance')

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
      setStep('select')
    } else if (step === 'select' && selectedGuests.length > 0) {
      setStep('confirm')
    }
  }

  const handleBackStep = () => {
    if (step === 'select') {
      setStep('attendance')
    } else if (step === 'confirm') {
      setStep('select')
    }
  }

  if (step === 'attendance') {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900">Step 1: Will you be attending?</h2>
          <p className="mt-2 text-base text-gray-700">
            Please let us know if you will be attending the wedding.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setIsAttending(true)}
              className={`flex-1 rounded-md px-4 py-3 text-base font-medium ${
                isAttending === true
                  ? 'bg-sage text-white'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              Yes, we&apos;ll be there
            </button>
            <button
              type="button"
              onClick={() => setIsAttending(false)}
              className={`flex-1 rounded-md px-4 py-3 text-base font-medium ${
                isAttending === false
                  ? 'bg-sage text-white'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              No, we can&apos;t make it
            </button>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={handleNextStep}
            disabled={isAttending === null}
            className="w-full rounded-md bg-sage/90 px-6 py-4 text-lg font-semibold shadow-md hover:bg-sage focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 disabled:bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300"
          >
            {isAttending === null ? 'Please select an option' : 'Continue'}
          </button>
        </div>
      </div>
    )
  }

  if (step === 'select') {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900">Step 2: Select Guests</h2>
          <p className="mt-2 text-base text-gray-700">
            {isAttending 
              ? "Please select all guests who will be attending."
              : "Please select all guests who will not be attending."}
          </p>
        </div>

        <GuestSelection
          guestList={guestList}
          onGuestSelectionChange={handleGuestSelectionChange}
          isAttending={isAttending}
        />

        <div className="mt-8">
          <button
            type="button"
            onClick={handleNextStep}
            disabled={selectedGuests.length === 0}
            className="w-full rounded-md bg-sage/90 px-6 py-4 text-lg font-semibold shadow-md hover:bg-sage focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 disabled:bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300"
          >
            {selectedGuests.length === 0 ? 'Select Guests to Continue' : 'Continue to Confirm'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-medium text-gray-900">Step 3: Confirm Details</h2>
        <p className="mt-2 text-base text-gray-700">
          Please review your RSVP details.
        </p>
      </div>

      <div className="rounded-md bg-gray-50 p-4">
        <h3 className="text-base font-medium text-gray-900">Selected Guests:</h3>
        <ul className="mt-2 space-y-1">
          {selectedGuests.map((guest) => (
            <li key={`${guest.firstName}-${guest.lastName}`} className="text-base text-gray-700">
              {guest.title} {guest.firstName} {guest.lastName}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-md bg-gray-50 p-4">
        <h3 className="text-base font-medium text-gray-900">Attendance Status:</h3>
        <p className="mt-2 text-base text-gray-700">
          {isAttending ? "Will be attending" : "Will not be attending"}
        </p>
      </div>

      {isAttending && (
        <div className="space-y-4">
          <div>
            <label
              htmlFor="dietary"
              className="block text-base font-medium text-gray-900"
            >
              Dietary Restrictions
            </label>
            <textarea
              id="dietary"
              name="dietary"
              rows={3}
              value={dietaryRestrictions}
              onChange={(e) => setDietaryRestrictions(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sage focus:ring-sage sm:text-base"
              placeholder="Please let us know if any of the selected guests have dietary restrictions or allergies"
            />
          </div>
        </div>
      )}

      <div className="flex space-x-4 pt-4">
        <button
          type="button"
          onClick={handleBackStep}
          className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 rounded-md bg-sage px-4 py-3 text-base font-medium text-white hover:bg-sage/90 focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 disabled:bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300"
        >
          {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
        </button>
      </div>
    </form>
  )
}
