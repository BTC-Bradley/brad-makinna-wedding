import { useState, useEffect } from 'react'
import type { GuestListDocument, Guest } from '@/interfaces/guest'

interface GuestSelectionProps {
  guestList: GuestListDocument
  onGuestSelectionChange: (selectedGuests: Guest[]) => void
  isAttending: boolean | null
}

export default function GuestSelection({
  guestList,
  onGuestSelectionChange,
  isAttending,
}: GuestSelectionProps) {
  const [selectedGuests, setSelectedGuests] = useState<Guest[]>([])

  useEffect(() => {
    // Initialize with guest1 selected by default
    setSelectedGuests([guestList.guest1])
    onGuestSelectionChange([guestList.guest1])
  }, [guestList, isAttending])

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
        className="h-5 w-5 rounded border-gray-300 text-sage focus:ring-sage"
      />
      <label
        htmlFor={`guest-${guest.firstName}-${guest.lastName}`}
        className="text-base font-medium text-gray-900"
      >
        {label}
      </label>
    </div>
  )

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">
          {isAttending ? "Select Attending Guests" : "Select Non-Attending Guests"}
        </h3>
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
              <div className="mt-4 border-t border-gray-200 pt-4">
                <h4 className="text-base font-medium text-gray-900 mb-2">
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
    </div>
  )
}
