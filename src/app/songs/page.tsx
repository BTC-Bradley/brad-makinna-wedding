import { Metadata } from 'next'
import { getSongRequestData } from '@/lib/data-store'
import { config } from '@/config'

// Song list includes live demo RSVP submissions — do not prerender once.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Song Requests | Bradley & MaKinna Hanson',
  description: config.demoMode
    ? 'Sample song requests from the wedding RSVP demo'
    : 'Song requests from our wedding guests',
}

function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([^?&\s]+)/,
    /youtube\.com\/watch\?v=([^&\s]+)/,
    /youtube\.com\/embed\/([^?&\s]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

export default async function SongsPage() {
  const { guests, totalGuests, totalSongs } = await getSongRequestData()

  const songCounts: Record<string, { count: number; originalText: string }> = {}
  for (const guest of guests) {
    for (const song of guest.songs) {
      const key = song.text.toLowerCase().trim()
      if (!songCounts[key]) {
        songCounts[key] = { count: 0, originalText: song.text }
      }
      songCounts[key].count++
    }
  }

  const duplicates = Object.values(songCounts)
    .filter((v) => v.count >= 2)
    .sort((a, b) => b.count - a.count)

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-sage mb-2 text-center font-serif text-5xl font-light tracking-wide dark:text-amber-400">
        Song Requests
      </h1>
      <p className="mb-6 text-center text-gray-500 dark:text-gray-400">
        {config.demoMode
          ? 'Sample playlist ideas from the RSVP demo (not the live guest list)'
          : 'Songs guests requested for the reception'}
      </p>
      <div className="bg-sage/30 mx-auto mb-8 h-1 w-24 dark:bg-amber-400/30"></div>

      {config.demoMode && (
        <div className="mb-8 rounded-lg border border-amber-300/60 bg-amber-50 px-4 py-3 text-center text-sm text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100">
          Archive demo data only — submit a demo RSVP with song notes to add
          more here (in-memory).
        </div>
      )}

      <p className="mb-10 text-center text-gray-600 dark:text-gray-300">
        <span className="font-medium">{totalGuests}</span> guests submitted{' '}
        <span className="font-medium">{totalSongs}</span> song suggestions
      </p>

      {duplicates.length > 0 && (
        <div className="mb-10">
          <h2 className="text-sage mb-4 font-serif text-2xl font-light dark:text-amber-400">
            Fan Favorites
          </h2>
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-zinc-800 dark:shadow-lg">
            <div className="space-y-2">
              {duplicates.map((dup) => (
                <div
                  key={dup.originalText}
                  className="bg-sage/10 flex items-center justify-between rounded-lg px-4 py-3 dark:bg-amber-400/10"
                >
                  <span className="text-gray-700 dark:text-gray-200">
                    {dup.originalText}
                  </span>
                  <span className="bg-sage ml-3 shrink-0 rounded-full px-2.5 py-0.5 text-sm font-medium text-white dark:bg-amber-400 dark:text-zinc-900">
                    ×{dup.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-sage mb-4 font-serif text-2xl font-light dark:text-amber-400">
          By Guest
        </h2>
        {guests.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No song requests yet.
          </p>
        ) : (
          <div className="space-y-4">
            {guests.map((guest) => (
              <div
                key={guest.name}
                className="rounded-lg bg-white p-6 shadow-md dark:bg-zinc-800 dark:shadow-lg"
              >
                <h3 className="text-sage mb-3 border-sage border-l-2 pl-4 font-serif text-lg dark:border-amber-400 dark:text-amber-400">
                  {guest.name}
                </h3>
                <ul className="space-y-1 pl-4">
                  {guest.songs.map((song, i) => (
                    <li key={i} className="text-gray-600 dark:text-gray-300">
                      {song.url ? (
                        <a
                          href={song.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sage hover:underline dark:text-amber-400"
                        >
                          {getYouTubeVideoId(song.url)
                            ? `🎵 ${getYouTubeVideoId(song.url)}`
                            : '🎵 YouTube link'}
                        </a>
                      ) : (
                        song.text
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
