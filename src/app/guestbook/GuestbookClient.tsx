'use client'

import { useState, useRef, useEffect } from 'react'
import { FadeIn } from '@/components/FadeIn'

interface GuestbookEntry {
  id: string
  name: string
  message: string
  submittedAt: string
  approved: boolean
  _optimistic?: boolean
}

interface Props {
  initialEntries: GuestbookEntry[]
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return ''
  }
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

// Warm palette for avatar backgrounds — cycles by index
const avatarColors = [
  'from-[#9CAF88] to-[#7a9268]',
  'from-[#c8a97e] to-[#a8845a]',
  'from-[#F4D03F]/80 to-[#e8b84b]',
  'from-[#d4c5a9] to-[#b8a48a]',
  'from-[#a8c49e] to-[#7a9268]',
  'from-[#e8c99a] to-[#c8a56e]',
]

function EntryCard({
  entry,
  index,
}: {
  entry: GuestbookEntry
  index: number
}) {
  const colorClass = avatarColors[index % avatarColors.length]
  const initials = getInitials(entry.name)

  return (
    <div
      className={`relative rounded-2xl border border-[#9CAF88]/20 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md ${
        entry._optimistic ? 'ring-2 ring-[#9CAF88]/40' : ''
      }`}
    >
      {entry._optimistic && (
        <span className="absolute top-3 right-3 rounded-full bg-[#F4D03F]/30 px-2 py-0.5 font-sans text-[10px] font-medium text-[#a08030] uppercase tracking-wider">
          Pending approval
        </span>
      )}

      {/* Avatar */}
      <div className="mb-4 flex items-center gap-3">
        <div
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${colorClass} font-serif text-sm font-bold text-white shadow-sm`}
        >
          {initials}
        </div>
        <div>
          <p className="font-serif text-base font-semibold text-gray-800">
            {entry.name}
          </p>
          <p className="font-sans text-xs text-gray-400">
            {formatDate(entry.submittedAt)}
          </p>
        </div>
      </div>

      {/* Message */}
      <p className="font-sans text-sm leading-relaxed text-gray-600 italic">
        &ldquo;{entry.message}&rdquo;
      </p>

      {/* Decorative quote mark */}
      <div className="pointer-events-none absolute bottom-4 right-5 font-serif text-6xl leading-none text-[#9CAF88]/10 select-none">
        &rdquo;
      </div>
    </div>
  )
}

export default function GuestbookClient({ initialEntries }: Props) {
  const [entries, setEntries] = useState<GuestbookEntry[]>(initialEntries)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    setSubmitting(true)
    setError(null)

    const optimisticEntry: GuestbookEntry = {
      id: `optimistic_${Date.now()}`,
      name: name.trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
      approved: false,
      _optimistic: true,
    }

    // Optimistic update — prepend to list
    setEntries((prev) => [optimisticEntry, ...prev])
    setSubmitted(true)

    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to submit')
      }

      const { entry } = await res.json()

      // Replace optimistic entry with real one
      setEntries((prev) =>
        prev.map((e) => (e.id === optimisticEntry.id ? entry : e)),
      )

      setName('')
      setMessage('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      // Remove optimistic entry on failure
      setEntries((prev) => prev.filter((e) => e.id !== optimisticEntry.id))
      setSubmitted(false)
    } finally {
      setSubmitting(false)
    }
  }

  // Scroll to success message
  useEffect(() => {
    if (submitted && successRef.current) {
      successRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [submitted])

  return (
    <div className="mx-auto max-w-4xl px-4 pb-24 sm:px-6 lg:px-8">
      {/* Form section */}
      <FadeIn>
        <div className="mb-16 rounded-3xl border border-[#9CAF88]/20 bg-white/70 p-8 shadow-lg backdrop-blur-sm sm:p-10">
          <div className="mb-6 text-center">
            <span className="font-script text-3xl text-[#9CAF88]">Leave a Message</span>
            <p className="mt-2 font-sans text-sm text-gray-500">
              Share your love, advice, or a memory with us ✨
            </p>
          </div>

          {submitted && !error && (
            <div
              ref={successRef}
              className="mb-6 rounded-xl bg-[#9CAF88]/10 border border-[#9CAF88]/30 px-4 py-3 text-center"
            >
              <p className="font-sans text-sm text-[#5a7a50]">
                💌 Thank you! Your message has been added to our guestbook.
              </p>
            </div>
          )}

          {error && (
            <div className="mb-6 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-center">
              <p className="font-sans text-sm text-red-600">{error}</p>
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="gb-name"
                className="mb-1.5 block font-sans text-sm font-medium text-gray-700"
              >
                Your Name
              </label>
              <input
                id="gb-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah & James"
                maxLength={100}
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 font-sans text-sm text-gray-800 placeholder-gray-400 shadow-sm outline-none transition focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/20"
              />
            </div>

            <div>
              <label
                htmlFor="gb-message"
                className="mb-1.5 block font-sans text-sm font-medium text-gray-700"
              >
                Your Message
              </label>
              <textarea
                id="gb-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Wishing you both a lifetime of adventure, laughter, and love…"
                maxLength={1000}
                required
                rows={4}
                className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 font-sans text-sm text-gray-800 placeholder-gray-400 shadow-sm outline-none transition focus:border-[#9CAF88] focus:ring-2 focus:ring-[#9CAF88]/20"
              />
              <p className="mt-1 text-right font-sans text-xs text-gray-400">
                {message.length} / 1000
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting || !name.trim() || !message.trim()}
              className="w-full rounded-xl bg-[#9CAF88] px-6 py-3 font-serif text-sm font-semibold text-white shadow-md transition hover:bg-[#7a9268] disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]"
            >
              {submitting ? 'Sending…' : 'Sign the Guestbook 💌'}
            </button>
          </form>
        </div>
      </FadeIn>

      {/* Entries section */}
      {entries.length === 0 ? (
        <FadeIn>
          <div className="py-16 text-center">
            {/* Decorative hearts */}
            <div className="mb-6 flex justify-center gap-3 text-3xl">
              <span>💕</span>
              <span>📖</span>
              <span>💕</span>
            </div>
            <h3 className="mb-3 font-serif text-2xl text-gray-700">
              Be the first to sign!
            </h3>
            <p className="mx-auto max-w-md font-sans text-sm leading-relaxed text-gray-500">
              Our guestbook is empty and waiting for your kind words. Leave a
              message above — it means the world to us.
            </p>
          </div>
        </FadeIn>
      ) : (
        <FadeIn>
          <div className="mb-6 text-center">
            <p className="font-sans text-sm text-gray-400">
              {entries.length} message{entries.length !== 1 ? 's' : ''} of love
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {entries.map((entry, i) => (
              <EntryCard key={entry.id} entry={entry} index={i} />
            ))}
          </div>
        </FadeIn>
      )}
    </div>
  )
}
