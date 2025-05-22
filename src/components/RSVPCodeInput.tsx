'use client'

import { FormEvent } from 'react'

const VALID_CHARS = ['2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']

export default function RSVPCodeInput() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
      (input) => (input as HTMLInputElement).value.length === 1
    )
    if (allFilled) {
      const form = inputs[0].closest('form')
      if (form) {
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
  }

  return (
    <form action="/rsvp" method="get" className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="id"
          className="block text-lg font-medium text-gray-700 mb-4"
        >
          Enter your RSVP ID
        </label>
        <div className="flex justify-center gap-2 mb-3">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              pattern={`[${VALID_CHARS.join('')}]`}
              required
              aria-label={`RSVP code character ${i + 1}`}
              className="w-12 h-12 text-center text-xl font-medium border-2 border-gray-300 rounded-lg focus:border-sage focus:ring-sage focus:ring-2 focus:ring-offset-0 uppercase"
              style={{ textTransform: 'uppercase' }}
              onKeyUp={(e) => {
                const input = e.target as HTMLInputElement
                if (input.value.length === 1) {
                  const inputs = document.querySelectorAll('input[type="text"]')
                  checkAndSubmit(inputs)
                  
                  const nextInput = input.nextElementSibling as HTMLInputElement
                  if (nextInput) {
                    nextInput.focus()
                  }
                }
              }}
              onKeyDown={(e) => {
                const input = e.target as HTMLInputElement
                if (e.key === 'Backspace' && !input.value) {
                  const prevInput = input.previousElementSibling as HTMLInputElement
                  if (prevInput) {
                    prevInput.focus()
                  }
                }
              }}
              onChange={handleInputChange}
            />
          ))}
        </div>
        <input type="hidden" name="id" id="id" />
        <p className="mt-3 text-sm text-gray-500 text-center">
          Enter the 6-character code from your invitation
        </p>
      </div>
      <div>
        <button
          type="submit"
          className="bg-sage hover:bg-sage/90 focus:ring-sage w-full rounded-lg px-6 py-3 text-lg font-medium  transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          Find My Invitation
        </button>
      </div>
    </form>
  )
} 