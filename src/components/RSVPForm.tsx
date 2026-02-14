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
  const [step, setStep] = useState<'attendance' | 'confirmation' | 'success' | 'already_submitted'>(
    'attendance',
  )
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
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isAttendingWedding, setIsAttendingWedding] = useState<boolean>(false)
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
    setSubmitError(null)

    try {
      const attendingGuests = guestAttendance
        .filter((ga) => ga.isAttending === true)
        .map((ga) => {
          if (ga.guest.firstName === 'Guest') {
            return `${plusOneInfo.title} ${plusOneInfo.firstName} ${plusOneInfo.lastName}`
          }
          return `${ga.guest.title} ${ga.guest.firstName} ${ga.guest.lastName}`
        })

      const hasAttendingGuests = guestAttendance.some(
        (ga) => ga.isAttending === true,
      )

      const rsvpData = {
        guestId: guestList.id,
        rsvpId: guestList.rsvpId,
        attending: hasAttendingGuests,
        attendingGuests,
        dietaryRestrictions: dietaryRestrictions || undefined,
        additionalNotes: songRequests || undefined,
        submittedBy: guestAttendance
          .filter((ga) => ga.isAttending === true && !ga.isPlusOne)
          .map(
            (ga) =>
              `${ga.guest.title} ${ga.guest.firstName} ${ga.guest.lastName}`,
          )
          .join(', '),
      }

      console.log('RSVP Submission Data:', rsvpData)

      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rsvpData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (response.status === 409) {
          // Already submitted — show success-like state
          setIsAttendingWedding(false)
          setStep('already_submitted' as typeof step)
          return
        }
        throw new Error(errorData.error || 'Failed to submit RSVP')
      }

      const result = await response.json()
      console.log('RSVP submitted successfully:', result)

      // Store whether they're attending for the success message
      setIsAttendingWedding(hasAttendingGuests)

      // Move to success step
      setStep('success')
    } catch (error) {
      console.error('Error submitting RSVP:', error)
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderAttendanceStep = () => (
    <div className="space-y-6">
      {guestAttendance.map(({ guest, isAttending }) => (
        <div
          key={`${guest.firstName}-${guest.lastName}`}
          className="flex flex-col space-y-4 rounded-lg border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 dark:border-zinc-700 dark:bg-zinc-800"
        >
          <div className="text-base font-medium text-gray-900 sm:text-lg dark:text-gray-100">
            {guest.title} {guest.firstName} {guest.lastName}
          </div>
          <div className="flex space-x-2 sm:space-x-4">
            <button
              type="button"
              onClick={() => handleAttendanceChange(guest, true)}
              className={`cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 sm:px-4 ${
                isAttending === true
                  ? 'bg-sage ring-sage text-gray-900 shadow-md ring-2 ring-offset-2 dark:bg-amber-400 dark:text-gray-900 dark:ring-amber-400'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-zinc-700 dark:text-gray-300 dark:hover:bg-zinc-600'
              }`}
            >
              Attending
            </button>
            <button
              type="button"
              onClick={() => handleAttendanceChange(guest, false)}
              className={`cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 sm:px-4 ${
                isAttending === false
                  ? 'bg-sage ring-sage text-gray-900 shadow-md ring-2 ring-offset-2 dark:bg-amber-400 dark:text-gray-900 dark:ring-amber-400'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-zinc-700 dark:text-gray-300 dark:hover:bg-zinc-600'
              }`}
            >
              Not Attending
            </button>
          </div>
        </div>
      ))}

      {hasUnnamedPlusOne && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
          <h3 className="text-sage mb-2 text-lg font-medium dark:text-amber-400">
            Please provide your guest&apos;s information
          </h3>
          <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            We need this information to properly prepare for your guest&apos;s
            attendance.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
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
                className="focus:border-sage focus:ring-sage mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:focus:border-amber-400 dark:focus:ring-amber-400"
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
                className="focus:border-sage focus:ring-sage mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:focus:border-amber-400 dark:focus:ring-amber-400"
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
                className="focus:border-sage focus:ring-sage mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:focus:border-amber-400 dark:focus:ring-amber-400"
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

      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <button
          type="button"
          onClick={() => setStep('confirmation')}
          disabled={!isFormValid}
          className="bg-sage hover:bg-sage/90 focus:ring-sage w-full cursor-pointer rounded-md px-4 py-3 text-base font-semibold text-gray-900 shadow-md focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 sm:w-1/2 sm:px-6 sm:py-4 sm:text-lg dark:text-white dark:focus:ring-amber-400 dark:disabled:bg-gray-700 dark:disabled:text-gray-400 dark:disabled:hover:bg-gray-700"
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
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-zinc-700 dark:bg-zinc-800">
            <h3 className="text-sage mb-4 text-xl font-medium dark:text-amber-400">
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
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              onClick={() => setStep('attendance')}
              className="w-full cursor-pointer rounded-md bg-gray-100 px-4 py-3 text-base font-semibold text-gray-700 shadow-md hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none sm:w-1/2 sm:px-6 sm:py-4 sm:text-lg dark:bg-zinc-700 dark:text-gray-300 dark:hover:bg-zinc-600 dark:focus:ring-amber-400"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-sage hover:bg-sage/90 focus:ring-sage w-full cursor-pointer rounded-md px-4 py-3 text-base font-semibold text-gray-900 shadow-md focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 sm:w-1/2 sm:px-6 sm:py-4 sm:text-lg dark:text-white dark:focus:ring-amber-400 dark:disabled:bg-gray-700 dark:disabled:text-gray-400 dark:disabled:hover:bg-gray-700"
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
            <h3 className="text-sage text-xl font-medium dark:text-amber-400">
              Attending Guests
            </h3>
            <div className="space-y-2">
              {guestAttendance
                .filter((ga) => ga.isAttending === true)
                .map(({ guest }) => (
                  <div
                    key={`${guest.firstName}-${guest.lastName}`}
                    className="rounded-lg border border-gray-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-800"
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
            <h3 className="text-sage text-xl font-medium dark:text-amber-400">
              Not Attending Guests
            </h3>
            <div className="space-y-2">
              {guestAttendance
                .filter((ga) => ga.isAttending === false && !ga.isPlusOne)
                .map(({ guest }) => (
                  <div
                    key={`${guest.firstName}-${guest.lastName}`}
                    className="rounded-lg border border-gray-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-800"
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
              className="text-sage block text-base font-medium dark:text-amber-400"
            >
              Dietary Restrictions
            </label>
            <textarea
              id="dietary"
              name="dietary"
              rows={3}
              value={dietaryRestrictions}
              onChange={(e) => setDietaryRestrictions(e.target.value)}
              className="focus:border-sage focus:ring-sage mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm sm:text-base dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:focus:border-amber-400 dark:focus:ring-amber-400"
              placeholder="Please list each guest’s name along with their dietary restriction or allergy (e.g., 'John Smith – peanut allergy')."
            />
          </div>
        )}

        {hasAttendingGuests && (
          <div className="space-y-4">
            <label
              htmlFor="songs"
              className="text-sage block text-base font-medium dark:text-amber-400"
            >
              Song Requests
            </label>
            <textarea
              id="songs"
              name="songs"
              rows={3}
              value={songRequests}
              onChange={(e) => setSongRequests(e.target.value)}
              className="focus:border-sage focus:ring-sage mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm sm:text-base dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:focus:border-amber-400 dark:focus:ring-amber-400"
              placeholder="Share your favorite songs to help us create the perfect playlist for the celebration"
            />
          </div>
        )}

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <button
            type="button"
            onClick={() => setStep('attendance')}
            className="w-full cursor-pointer rounded-md bg-gray-100 px-4 py-3 text-base font-semibold text-gray-700 shadow-md hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none sm:w-1/2 sm:px-6 sm:py-4 sm:text-lg dark:bg-zinc-700 dark:text-gray-300 dark:hover:bg-zinc-600 dark:focus:ring-amber-400"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-sage hover:bg-sage/90 focus:ring-sage w-full cursor-pointer rounded-md px-4 py-3 text-base font-semibold text-gray-900 shadow-md focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 sm:w-1/2 sm:px-6 sm:py-4 sm:text-lg dark:text-white dark:focus:ring-amber-400 dark:disabled:bg-gray-700 dark:disabled:text-gray-400 dark:disabled:hover:bg-gray-700"
          >
            {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
          </button>
        </div>
      </div>
    )
  }

  const renderSuccessStep = () => {
    const attendingGuestsList = guestAttendance
      .filter((ga) => ga.isAttending === true)
      .map((ga) => {
        if (ga.guest.firstName === 'Guest') {
          return `${plusOneInfo.title} ${plusOneInfo.firstName} ${plusOneInfo.lastName}`
        }
        return `${ga.guest.title} ${ga.guest.firstName} ${ga.guest.lastName}`
      })

    if (isAttendingWedding) {
      return (
        <div className="space-y-8 text-center">
          <div className="border-sage/20 bg-sage/5 rounded-lg border p-8 dark:border-amber-400/30 dark:bg-amber-400/10">
            <div className="mb-6">
              <div className="bg-sage/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full dark:bg-amber-400/30">
                <svg
                  className="text-sage h-8 w-8 dark:text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-sage text-2xl font-medium dark:text-amber-400">
                We Can&apos;t Wait to See You!
              </h3>
            </div>
            <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
              Thank you for confirming your attendance. We&apos;re so excited to
              celebrate with you on our special day!
            </p>

            {attendingGuestsList.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sage mb-3 text-base font-medium dark:text-amber-400">
                  Confirmed Guests:
                </h4>
                <div className="space-y-2">
                  {attendingGuestsList.map((guestName, index) => (
                    <div
                      key={index}
                      className="rounded-md bg-white p-2 text-gray-800 dark:bg-zinc-700 dark:text-gray-200"
                    >
                      {guestName}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-md bg-white p-4 text-left dark:bg-zinc-700">
              <h4 className="text-sage mb-2 font-medium dark:text-amber-400">
                What&apos;s Next?
              </h4>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>
                  • Visit our website for travel and accommodation details
                </li>
                <li>
                  • Please reach out to us if you have any questions or need to
                  update your RSVP
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              onClick={() => (window.location.href = '/travel')}
              className="bg-sage hover:bg-sage/90 focus:ring-sage w-full cursor-pointer rounded-md px-4 py-3 text-base font-semibold text-gray-900 shadow-md focus:ring-2 focus:ring-offset-2 focus:outline-none sm:w-1/2 sm:px-6 sm:py-4 sm:text-lg dark:text-white dark:focus:ring-amber-400"
            >
              View Travel Info
            </button>
            <button
              type="button"
              onClick={() => (window.location.href = '/schedule')}
              className="w-full cursor-pointer rounded-md bg-gray-100 px-4 py-3 text-base font-semibold text-gray-700 shadow-md hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none sm:w-1/2 sm:px-6 sm:py-4 sm:text-lg dark:bg-zinc-700 dark:text-gray-300 dark:hover:bg-zinc-600 dark:focus:ring-amber-400"
            >
              View Schedule
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="space-y-8 text-center">
          <div className="rounded-lg border border-gray-200 bg-white p-8 dark:border-zinc-700 dark:bg-zinc-800">
            <div className="mb-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-700">
                <svg
                  className="h-8 w-8 text-gray-400 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-sage text-2xl font-medium dark:text-amber-400">
                We&apos;ll Miss You
              </h3>
            </div>
            <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
              Thank you for letting us know. While we&apos;re sorry you
              can&apos;t join us on our special day, we appreciate you taking
              the time to respond.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              We hope you&apos;re doing well and look forward to celebrating
              with you another time.
            </p>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => (window.location.href = '/')}
              className="bg-sage hover:bg-sage/90 focus:ring-sage cursor-pointer rounded-md px-6 py-3 text-base font-semibold text-gray-900 shadow-md focus:ring-2 focus:ring-offset-2 focus:outline-none sm:px-8 sm:py-4 sm:text-lg dark:text-white dark:focus:ring-amber-400"
            >
              Return to Home
            </button>
          </div>
        </div>
      )
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {step !== 'success' && (
        <div className="text-center">
          <h2 className="text-sage text-2xl font-medium dark:text-amber-400">
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
      )}

      {submitError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                There was an error submitting your RSVP
              </h3>
              <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                {submitError}
              </p>
            </div>
          </div>
        </div>
      )}

      {step === 'already_submitted' ? (
        <div className="space-y-6 text-center">
          <div className="bg-sage/20 mx-auto flex h-16 w-16 items-center justify-center rounded-full dark:bg-amber-400/30">
            <svg
              className="text-sage h-8 w-8 dark:text-amber-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-sage text-2xl font-medium dark:text-amber-400">
            Thank You!
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            We&apos;ve already received your RSVP. Thank you for letting us know!
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            If you need to make changes, please reach out to us directly.
          </p>
        </div>
      ) : step === 'attendance'
        ? renderAttendanceStep()
        : step === 'confirmation'
          ? renderConfirmationStep()
          : renderSuccessStep()}
    </form>
  )
}
