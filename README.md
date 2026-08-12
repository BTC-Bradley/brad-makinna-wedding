# Bradley & MaKinna Wedding Website (Archive)

A responsive wedding website built with Next.js, TypeScript, and Tailwind CSS.

**Status:** Historical archive of Bradley & MaKinna Hanson’s wedding site (married **July 11, 2026**, Snoqualmie, WA). Copy is written in past tense. **RSVP** is a portfolio demo with fictional guest data (real RSVP/PII removed).

**Always demo mode** — guests and RSVPs come from in-repo sample data (`src/data/demo-*.ts`) via `src/lib/data-store.ts`. No database, no Azure Cosmos, no env secrets required.

Companion admin demo: [brad-makinna-wedding-rsvp](https://brad-makinna-wedding-rsvp.vercel.app/rsvps).

## Features

- 🎨 Rustic, romantic design with earthy tones
- 📱 Fully responsive for all devices
- ⏰ Countdown timer to the wedding day
- 📝 **Interactive RSVP demo** (invitation code lookup, multi-guest attendance, dietary notes, song requests)
- 🎵 Song requests page fed by RSVP submissions
- 📍 Venue, travel, schedule, wedding party, FAQ, gifts
- 📖 Our story timeline

## Demo RSVP

On `/rsvp`, **any 6-character code** using the invitation alphabet (`2–9`, `A–F`) works — unknown codes get a generated fictional party. Optional curated scenarios:

| Code   | Party |
|--------|--------|
| `A2B3C4` | Couple |
| `B4C5D6` | Family of 4 (pre-submitted seed) |
| `C5D6E7` | Single + plus-one slot |
| `D6E7F8` | Couple (pre-submitted seed) |
| `E7F8A9` | Single (pre-submitted seed) |

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — use **RSVP** in the nav or `/rsvp`.

Optional `.env.local` (not required):

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
