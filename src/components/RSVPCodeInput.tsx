'use client'

import { FormEvent, useState } from 'react'

const VALID_CHARS = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
]

export default function RSVPCodeInput() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const inputs = document.querySelectorAll('input[type="text"]')
    const code = Array.from(inputs)
      .map((input) => (input as HTMLInputElement).value)
      .join('')
    const hiddenInput = document.getElementById('id') as HTMLInputElement
    hiddenInput.value = code
    e.currentTarget.submit()
  }

  const checkAndSubmit = (inputs: NodeListOf<Element>) => {
    const allFilled = Array.from(inputs).every(
      (input) => (input as HTMLInputElement).value.length === 1,
    )
    if (allFilled) {
      const form = inputs[0].closest('form')
      if (form) {
        setIsSubmitting(true)
        const code = Array.from(inputs)
          .map((input) => (input as HTMLInputElement).value)
          .join('')
        const hiddenInput = document.getElementById('id') as HTMLInputElement
        hiddenInput.value = code
        form.submit()
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const value = input.value.toUpperCase()

    // Only allow valid characters
    if (value && !VALID_CHARS.includes(value)) {
      input.value = ''
      return
    }

    input.value = value

    // If we have a value, check for submission and move to next input
    if (value.length === 1) {
      const inputs = document.querySelectorAll('input[type="text"]')
      checkAndSubmit(inputs)

      const nextInput = input.nextElementSibling as HTMLInputElement
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement

    if (e.key === 'Backspace' && !input.value) {
      const prevInput = input.previousElementSibling as HTMLInputElement
      if (prevInput) {
        prevInput.focus()
        prevInput.value = '' // Clear the previous input
      }
    }
  }

  return (
    <form
      action="/rsvp"
      method="get"
      className="space-y-6"
      onSubmit={handleSubmit}
    >
      <div>
        <label
          htmlFor="id"
          className="mb-4 block text-center text-lg font-medium text-gray-700 dark:text-gray-300"
        >
          Enter your RSVP ID
        </label>
        <div className="mb-3 flex justify-center gap-2">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              pattern={`[${VALID_CHARS.join('')}]`}
              required
              aria-label={`RSVP code character ${i + 1}`}
              className={`h-12 w-12 rounded-lg border-2 border-gray-300 text-center text-xl font-medium uppercase focus:border-amber-300 focus:ring-2 focus:ring-amber-300 focus:ring-offset-0 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-amber-300 ${
                isSubmitting ? 'cursor-not-allowed opacity-50' : ''
              }`}
              disabled={isSubmitting}
              style={{ textTransform: 'uppercase' }}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onPaste={(e) => {
                e.preventDefault()
                if (isSubmitting) return
                const pastedData = e.clipboardData.getData('text').toUpperCase()
                const validChars = pastedData
                  .split('')
                  .filter((char) => VALID_CHARS.includes(char))

                if (validChars.length === 6) {
                  const inputs = document.querySelectorAll('input[type="text"]')
                  validChars.forEach((char, index) => {
                    const input = inputs[index] as HTMLInputElement
                    input.value = char
                  })

                  // Submit the form if all characters are valid
                  const form = inputs[0].closest('form')
                  if (form) {
                    setIsSubmitting(true)
                    const code = validChars.join('')
                    const hiddenInput = document.getElementById(
                      'id',
                    ) as HTMLInputElement
                    hiddenInput.value = code
                    form.submit()
                  }
                }
              }}
            />
          ))}
        </div>
        <input type="hidden" name="id" id="id" />
        <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
          Enter the 6-character code from your invitation
        </p>
      </div>
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`mx-auto block w-64 cursor-pointer rounded-lg border-2 border-amber-300/80 px-6 py-3 text-lg font-medium text-gray-900 transition-colors duration-200 hover:border-amber-300/90 hover:bg-amber-300/10 focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:outline-none dark:text-white ${
            isSubmitting ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <svg
                className="h-5 w-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Finding...</span>
            </div>
          ) : (
            'Find My Invitation'
          )}
        </button>
      </div>
    </form>
  )
}
