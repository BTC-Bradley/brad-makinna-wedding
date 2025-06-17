'use client'

import { useState } from 'react'
import type { GuestListDocument, Guest } from '@/interfaces/guest'

interface RSVPFormProps {
  guestList: GuestListDocument
}

interface GuestAttendance {
  guest: Guest
  isAttending: boolean | null
  isPlusOne?: boolean
}

interface PlusOneInfo {
  title: string
  firstName: string
  lastName: string
}

export default function RSVPForm({ guestList }: RSVPFormProps) {
  const [step, setStep] = useState<'attendance' | 'confirmation'>('attendance')
  const [guestAttendance, setGuestAttendance] = useState<GuestAttendance[]>(
    () => {
      const allGuests = [
        guestList.guest1,
        ...(guestList.guestCount > 1 ||
        (guestList.guest2.firstName && guestList.guest2.lastName)
          ? [guestList.guest2]
          : []),
        ...(guestList.additionalGuests || []),
      ]
      return allGuests.map((guest) => ({
        guest,
        isAttending: null,
        isPlusOne: guest.firstName === 'Guest',
      }))
    },
  )
  const [dietaryRestrictions, setDietaryRestrictions] = useState('')
  const [songRequests, setSongRequests] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [plusOneInfo, setPlusOneInfo] = useState<PlusOneInfo>({
    title: '',
    firstName: '',
    lastName: '',
  })

  const handleAttendanceChange = (guest: Guest, isAttending: boolean) => {
    setGuestAttendance((prev) => {
      // If this is a plus-one guest and the main guest is not attending, prevent marking as attending
      if (guest.firstName === 'Guest' && isAttending) {
        const mainGuest = prev.find((ga) => !ga.isPlusOne)
        if (mainGuest && mainGuest.isAttending === false) {
          return prev // Don't allow the change
        }
      }

      // If this is the main guest and they're marking as not attending, also mark plus-one as not attending
      if (
        !prev.find((ga) => ga.guest.firstName === guest.firstName)?.isPlusOne &&
        !isAttending
      ) {
        return prev.map((ga) => {
          if (ga.isPlusOne) {
            return { ...ga, isAttending: false }
          }
          if (
            ga.guest.firstName === guest.firstName &&
            ga.guest.lastName === guest.lastName
          ) {
            return { ...ga, isAttending }
          }
          return ga
        })
      }

      // Normal case - just update the specific guest
      return prev.map((ga) =>
        ga.guest.firstName === guest.firstName &&
        ga.guest.lastName === guest.lastName
          ? { ...ga, isAttending }
          : ga,
      )
    })
  }

  const handlePlusOneInfoChange = (field: keyof PlusOneInfo, value: string) => {
    setPlusOneInfo((prev) => {
      const newInfo = { ...prev, [field]: value }

      // Update the guest's name in guestAttendance
      setGuestAttendance((prevAttendance) =>
        prevAttendance.map((ga) =>
          ga.isPlusOne
            ? {
                ...ga,
                guest: {
                  ...ga.guest,
                  title: newInfo.title,
                  firstName: newInfo.firstName,
                  lastName: newInfo.lastName,
                },
              }
            : ga,
        ),
      )

      return newInfo
    })
  }

  const hasUnnamedPlusOne = guestAttendance.some(
    (ga) => ga.isPlusOne && ga.isAttending === true,
  )

  const isPlusOneInfoValid = hasUnnamedPlusOne
    ? plusOneInfo.title && plusOneInfo.firstName && plusOneInfo.lastName
    : true

  const isFormValid =
    guestAttendance.every((ga) => ga.isAttending !== null) && isPlusOneInfoValid

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const attendingGuests = guestAttendance
        .filter((ga) => ga.isAttending === true)
        .map((ga) => {
          if (ga.guest.firstName === 'Guest') {
            return {
              ...ga.guest,
              title: plusOneInfo.title,
              firstName: plusOneInfo.firstName,
              lastName: plusOneInfo.lastName,
            }
          }
          return ga.guest
        })

      const notAttendingGuests = guestAttendance
        .filter((ga) => ga.isAttending === false)
        .map((ga) => ga.guest)

      console.log('RSVP Submission Data:', {
        guestListId: guestList.id,
        attendingGuests,
        notAttendingGuests,
        dietaryRestrictions,
        songRequests,
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

  const renderAttendanceStep = () => (
    <div className="space-y-6">
      {guestAttendance.map(({ guest, isAttending }) => (
        <div
          key={`${guest.firstName}-${guest.lastName}`}
          className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100">
            {guest.title} {guest.firstName} {guest.lastName}
          </div>
          <div className="flex space-x-2 sm:space-x-4">
            <button
              type="button"
              onClick={() => handleAttendanceChange(guest, true)}
              className={`cursor-pointer rounded-md px-3 sm:px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isAttending === true
                  ? 'bg-sage ring-sage text-gray-900 shadow-md ring-2 ring-offset-2 dark:text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Attending
            </button>
            <button
              type="button"
              onClick={() => handleAttendanceChange(guest, false)}
              className={`cursor-pointer rounded-md px-3 sm:px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isAttending === false
                  ? 'bg-sage ring-sage text-gray-900 shadow-md ring-2 ring-offset-2 dark:text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Not Attending
            </button>
          </div>
        </div>
      ))}

      {hasUnnamedPlusOne && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
            Please provide your guest&apos;s information
          </h3>
          <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            We need this information to properly prepare for your guest&apos;s
            attendance.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-3">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <select
                id="title"
                value={plusOneInfo.title}
                onChange={(e) =>
                  handlePlusOneInfoChange('title', e.target.value)
                }
                required
                className="focus:border-sage focus:ring-sage mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                aria-describedby="title-required"
              >
                <option value="">Select a title</option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
                <option value="Dr.">Dr.</option>
              </select>
              {!plusOneInfo.title && (
                <p
                  id="title-required"
                  className="mt-1 text-sm text-red-600 dark:text-red-400"
                >
                  Please select a title
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                value={plusOneInfo.firstName}
                onChange={(e) =>
                  handlePlusOneInfoChange('firstName', e.target.value)
                }
                required
                placeholder="Enter first name"
                className="focus:border-sage focus:ring-sage mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                aria-describedby="firstName-required"
              />
              {!plusOneInfo.firstName && (
                <p
                  id="firstName-required"
                  className="mt-1 text-sm text-red-600 dark:text-red-400"
                >
                  Please enter a first name
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                value={plusOneInfo.lastName}
                onChange={(e) =>
                  handlePlusOneInfoChange('lastName', e.target.value)
                }
                required
                placeholder="Enter last name"
                className="focus:border-sage focus:ring-sage mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                aria-describedby="lastName-required"
              />
              {!plusOneInfo.lastName && (
                <p
                  id="lastName-required"
                  className="mt-1 text-sm text-red-600 dark:text-red-400"
                >
                  Please enter a last name
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <button
          type="button"
          onClick={() => setStep('confirmation')}
          disabled={!isFormValid}
          className="w-full sm:w-1/2 cursor-pointer rounded-md bg-sage hover:bg-sage/90 focus:ring-sage px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-semibold text-gray-900 shadow-md focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 dark:text-white dark:disabled:bg-gray-700 dark:disabled:text-gray-400 dark:disabled:hover:bg-gray-700"
        >
          Continue to Confirmation
        </button>
      </div>
    </div>
  )

  const renderConfirmationStep = () => {
    const hasAttendingGuests = guestAttendance.some(
      (ga) => ga.isAttending === true,
    )
    const hasNotAttendingGuests = guestAttendance.some(
      (ga) => ga.isAttending === false && !ga.isPlusOne,
    )

    if (!hasAttendingGuests) {
      return (
        <div className="space-y-8">
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-gray-100">
              We&apos;re Sorry to Miss You
            </h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              {guestAttendance
                .filter((ga) => ga.isAttending === false && !ga.isPlusOne)
                .map(({ guest }, index, array) => (
                  <span key={`${guest.firstName}-${guest.lastName}`}>
                    {index === 0
                      ? ''
                      : index === array.length - 1
                        ? ' and '
                        : ', '}
                    {guest.title} {guest.firstName} {guest.lastName}
                  </span>
                ))}
              , thank you for letting us know. We hope you&apos;re doing well
              and look forward to celebrating with you another time.
            </p>
          </div>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <button
              type="button"
              onClick={() => setStep('attendance')}
              className="w-full sm:w-1/2 cursor-pointer rounded-md bg-gray-100 px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-semibold text-gray-700 shadow-md hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-sage hover:bg-sage/90 focus:ring-sage w-full sm:w-1/2 cursor-pointer rounded-md px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-semibold text-gray-900 shadow-md focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 dark:text-white dark:disabled:bg-gray-700 dark:disabled:text-gray-400 dark:disabled:hover:bg-gray-700"
            >
              {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-8">
        {hasAttendingGuests && (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">
              Attending Guests
            </h3>
            <div className="space-y-2">
              {guestAttendance
                .filter((ga) => ga.isAttending === true)
                .map(({ guest }) => (
                  <div
                    key={`${guest.firstName}-${guest.lastName}`}
                    className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800"
                  >
                    {guest.firstName === 'Guest'
                      ? `${plusOneInfo.title} ${plusOneInfo.firstName} ${plusOneInfo.lastName}`
                      : `${guest.title} ${guest.firstName} ${guest.lastName}`}
                  </div>
                ))}
            </div>
          </div>
        )}

        {hasNotAttendingGuests && (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">
              Not Attending Guests
            </h3>
            <div className="space-y-2">
              {guestAttendance
                .filter((ga) => ga.isAttending === false && !ga.isPlusOne)
                .map(({ guest }) => (
                  <div
                    key={`${guest.firstName}-${guest.lastName}`}
                    className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800"
                  >
                    {guest.title} {guest.firstName} {guest.lastName}
                  </div>
                ))}
            </div>
          </div>
        )}

        {hasAttendingGuests && (
          <div className="space-y-4">
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
              className="focus:border-sage focus:ring-sage mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm sm:text-base dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Please let us know if any of the selected guests have dietary restrictions or allergies"
            />
          </div>
        )}

        {hasAttendingGuests && (
          <div className="space-y-4">
            <label
              htmlFor="songs"
              className="block text-base font-medium text-gray-900 dark:text-gray-100"
            >
              Song Requests
            </label>
            <textarea
              id="songs"
              name="songs"
              rows={3}
              value={songRequests}
              onChange={(e) => setSongRequests(e.target.value)}
              className="focus:border-sage focus:ring-sage mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm sm:text-base dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Share your favorite songs to help us create the perfect playlist for the celebration"
            />
          </div>
        )}

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <button
            type="button"
            onClick={() => setStep('attendance')}
            className="w-full sm:w-1/2 cursor-pointer rounded-md bg-gray-100 px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-semibold text-gray-700 shadow-md hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-sage hover:bg-sage/90 focus:ring-sage w-full sm:w-1/2 cursor-pointer rounded-md px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-semibold text-gray-900 shadow-md focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 dark:text-white dark:disabled:bg-gray-700 dark:disabled:text-gray-400 dark:disabled:hover:bg-gray-700"
          >
            {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-medium text-gray-900 dark:text-gray-100">
          RSVP for Your Party
        </h2>
        <p className="mt-2 text-base text-gray-700 dark:text-gray-300">
          {step === 'attendance'
            ? 'Please indicate whether each member of your party will be attending.'
            : guestAttendance.some((ga) => ga.isAttending === true)
              ? 'Please review your selections and add any dietary restrictions before submitting.'
              : 'Please review your selections before submitting.'}
        </p>
      </div>

      {step === 'attendance'
        ? renderAttendanceStep()
        : renderConfirmationStep()}
    </form>
  )
}
