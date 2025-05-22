import { useState, useEffect } from 'react'
import type { GuestListDocument, Guest } from '@/interfaces/guest'

interface GuestSelectionProps {
  guestList: GuestListDocument
  onGuestSelectionChange: (selectedGuests: Guest[]) => void
}

export default function GuestSelection({
  guestList,
  onGuestSelectionChange,
}: GuestSelectionProps) {
  const [selectedGuests, setSelectedGuests] = useState<Guest[]>([])

  useEffect(() => {
    // Initialize with guest1 selected by default
    setSelectedGuests([guestList.guest1])
    onGuestSelectionChange([guestList.guest1])
  }, [guestList])

  const handleGuestToggle = (guest: Guest) => {
    setSelectedGuests((prev) => {
      const isSelected = prev.some(
        (g) => g.firstName === guest.firstName && g.lastName === guest.lastName,
      )
      let newSelection

      if (isSelected) {
        newSelection = prev.filter(
          (g) =>
            !(g.firstName === guest.firstName && g.lastName === guest.lastName),
        )
      } else {
        newSelection = [...prev, guest]
      }

      onGuestSelectionChange(newSelection)
      return newSelection
    })
  }

  const renderGuestCheckbox = (guest: Guest, label: string) => (
    <div
      key={`${guest.firstName}-${guest.lastName}`}
      className="flex items-center space-x-3 py-2"
    >
      <input
        type="checkbox"
        id={`guest-${guest.firstName}-${guest.lastName}`}
        checked={selectedGuests.some(
          (g) =>
            g.firstName === guest.firstName && g.lastName === guest.lastName,
        )}
        onChange={() => handleGuestToggle(guest)}
        className="text-sage focus:ring-sage h-4 w-4 rounded border-gray-300"
      />
      <label
        htmlFor={`guest-${guest.firstName}-${guest.lastName}`}
        className="text-sm font-medium text-gray-700"
      >
        {label}
      </label>
    </div>
  )

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Select Guests</h3>
      <div className="space-y-2">
        {renderGuestCheckbox(
          guestList.guest1,
          `${guestList.guest1.title} ${guestList.guest1.firstName} ${guestList.guest1.lastName}`,
        )}

        {guestList.guest2 &&
          renderGuestCheckbox(
            guestList.guest2,
            `${guestList.guest2.title} ${guestList.guest2.firstName} ${guestList.guest2.lastName}`,
          )}

        {guestList.additionalGuests &&
          guestList.additionalGuests.length > 0 && (
            <div className="mt-4">
              <h4 className="mb-2 text-sm font-medium text-gray-700">
                Additional Guests
              </h4>
              {guestList.additionalGuests.map((guest) =>
                renderGuestCheckbox(
                  guest,
                  `${guest.title} ${guest.firstName} ${guest.lastName}`,
                ),
              )}
            </div>
          )}
      </div>
    </div>
  )
}
