'use client'

import { useEffect, useState } from 'react'

const sections = [
  { id: 'hotel', label: 'Hotel' },
  { id: 'shuttle', label: 'Shuttle Service' },
  { id: 'parking', label: 'Parking' },
  { id: 'airport', label: 'Airport' },
  { id: 'attractions', label: 'Nearby Attractions' },
]

export default function TravelIndex() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="sticky top-0 z-10 hidden w-full bg-white/80 py-4 backdrop-blur-sm lg:block dark:bg-zinc-900/80">
      <div className="mx-auto max-w-4xl px-4">
        <nav className="flex justify-center space-x-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeSection === section.id
                  ? 'bg-sage/90 dark:bg-sage/80 scale-105 text-amber-500 shadow-md'
                  : 'hover:bg-sage/10 bg-white text-gray-700 hover:scale-105 dark:bg-zinc-800 dark:text-gray-200'
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
