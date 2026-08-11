import type { GuestListDocument } from '@/interfaces/guest'

/**
 * Sample invitation parties for portfolio / resume demo mode.
 *
 * Codes use only the RSVP input alphabet: 2-9 and A-F (6 characters).
 * These are intentionally fictional — no real guest PII.
 */
export const DEMO_GUESTS: GuestListDocument[] = [
  {
    id: 'A2B3C4',
    rsvpId: 'A2B3C4',
    names: 'Alex Rivera & Jordan Lee',
    formalAddressing: 'Mr. Alex Rivera & Mx. Jordan Lee',
    sortName: 'Rivera',
    guest1: {
      title: 'Mr.',
      firstName: 'Alex',
      lastName: 'Rivera',
      suffix: '',
    },
    guest2: {
      title: 'Mx.',
      firstName: 'Jordan',
      lastName: 'Lee',
      suffix: '',
    },
    additionalGuests: [],
    guestCount: 2,
    outOfTown: 'Yes',
    address: {
      street: '123 Demo Street',
      streetLine2: '',
      city: 'Seattle',
      stateProvince: 'WA',
      postalCode: '98101',
      country: 'USA',
      formatted: {
        line1: '123 Demo Street',
        line2: 'Seattle, WA 98101',
        line3: 'USA',
        line4: '',
      },
    },
    email: 'alex.demo@example.com',
    phone: '(555) 010-1001',
    group: 'Demo Friends',
    list: 'Demo',
    giftReceived: '',
    thankYouSent: '',
  },
  {
    id: 'B4C5D6',
    rsvpId: 'B4C5D6',
    names: 'Sam Chen, Riley Chen & Family',
    formalAddressing: 'Mr. & Mrs. Sam Chen and Family',
    sortName: 'Chen',
    guest1: {
      title: 'Mr.',
      firstName: 'Sam',
      lastName: 'Chen',
      suffix: '',
    },
    guest2: {
      title: 'Mrs.',
      firstName: 'Riley',
      lastName: 'Chen',
      suffix: '',
    },
    additionalGuests: [
      {
        title: '',
        firstName: 'Taylor',
        lastName: 'Chen',
        suffix: '',
      },
      {
        title: '',
        firstName: 'Casey',
        lastName: 'Chen',
        suffix: '',
      },
    ],
    guestCount: 4,
    outOfTown: 'No',
    address: {
      street: '456 Sample Ave',
      streetLine2: 'Apt 2',
      city: 'Bellevue',
      stateProvince: 'WA',
      postalCode: '98004',
      country: 'USA',
      formatted: {
        line1: '456 Sample Ave, Apt 2',
        line2: 'Bellevue, WA 98004',
        line3: 'USA',
        line4: '',
      },
    },
    email: 'sam.demo@example.com',
    phone: '(555) 010-1002',
    group: 'Demo Family',
    list: 'Demo',
    giftReceived: '',
    thankYouSent: '',
  },
  {
    id: 'C5D6E7',
    rsvpId: 'C5D6E7',
    names: 'Morgan Blake',
    formalAddressing: 'Ms. Morgan Blake',
    sortName: 'Blake',
    guest1: {
      title: 'Ms.',
      firstName: 'Morgan',
      lastName: 'Blake',
      suffix: '',
    },
    guest2: {
      title: '',
      firstName: 'Guest',
      lastName: '',
      suffix: '',
    },
    additionalGuests: [],
    guestCount: 1,
    outOfTown: 'Yes',
    address: {
      street: '789 Portfolio Rd',
      streetLine2: '',
      city: 'Portland',
      stateProvince: 'OR',
      postalCode: '97201',
      country: 'USA',
      formatted: {
        line1: '789 Portfolio Rd',
        line2: 'Portland, OR 97201',
        line3: 'USA',
        line4: '',
      },
    },
    email: 'morgan.demo@example.com',
    phone: '(555) 010-1003',
    group: 'Demo Friends',
    list: 'Demo',
    giftReceived: '',
    thankYouSent: '',
  },
  {
    id: 'D6E7F8',
    rsvpId: 'D6E7F8',
    names: 'Quinn Avery & Cameron Avery',
    formalAddressing: 'Dr. Quinn Avery & Mr. Cameron Avery',
    sortName: 'Avery',
    guest1: {
      title: 'Dr.',
      firstName: 'Quinn',
      lastName: 'Avery',
      suffix: '',
    },
    guest2: {
      title: 'Mr.',
      firstName: 'Cameron',
      lastName: 'Avery',
      suffix: '',
    },
    additionalGuests: [],
    guestCount: 2,
    outOfTown: 'No',
    address: {
      street: '101 Example Blvd',
      streetLine2: '',
      city: 'Redmond',
      stateProvince: 'WA',
      postalCode: '98052',
      country: 'USA',
      formatted: {
        line1: '101 Example Blvd',
        line2: 'Redmond, WA 98052',
        line3: 'USA',
        line4: '',
      },
    },
    email: 'quinn.demo@example.com',
    phone: '(555) 010-1004',
    group: 'Demo Colleagues',
    list: 'Demo',
    giftReceived: '',
    thankYouSent: '',
  },
  {
    id: 'E7F8A9',
    rsvpId: 'E7F8A9',
    names: 'Jamie Soto',
    formalAddressing: 'Mx. Jamie Soto',
    sortName: 'Soto',
    guest1: {
      title: 'Mx.',
      firstName: 'Jamie',
      lastName: 'Soto',
      suffix: '',
    },
    guest2: {
      title: '',
      firstName: '',
      lastName: '',
      suffix: '',
    },
    additionalGuests: [],
    guestCount: 1,
    outOfTown: 'Yes',
    address: {
      street: '55 Showcase Lane',
      streetLine2: '',
      city: 'Tacoma',
      stateProvince: 'WA',
      postalCode: '98402',
      country: 'USA',
      formatted: {
        line1: '55 Showcase Lane',
        line2: 'Tacoma, WA 98402',
        line3: 'USA',
        line4: '',
      },
    },
    email: 'jamie.demo@example.com',
    phone: '(555) 010-1005',
    group: 'Demo Friends',
    list: 'Demo',
    giftReceived: '',
    thankYouSent: '',
  },
]

/** Codes shown on the demo RSVP page so visitors can try curated scenarios. */
export const DEMO_SAMPLE_CODES = DEMO_GUESTS.map((g) => ({
  code: g.id,
  label: g.names,
}))

/** Same alphabet as the RSVP code input UI (2–9, A–F). */
export const RSVP_CODE_CHARS = '23456789ABCDEF' as const
export const RSVP_CODE_PATTERN = /^[2-9A-F]{6}$/

export function isValidRsvpCode(code: string): boolean {
  return RSVP_CODE_PATTERN.test(code.trim().toUpperCase())
}

const DEMO_FIRST_NAMES = [
  'Alex',
  'Jordan',
  'Sam',
  'Riley',
  'Morgan',
  'Quinn',
  'Cameron',
  'Jamie',
  'Taylor',
  'Casey',
  'Avery',
  'Reese',
  'Parker',
  'Drew',
  'Skyler',
  'Hayden',
] as const

const DEMO_LAST_NAMES = [
  'Rivera',
  'Chen',
  'Blake',
  'Avery',
  'Soto',
  'Nguyen',
  'Patel',
  'Brooks',
  'Keller',
  'Hayes',
  'Ortiz',
  'Singh',
] as const

const DEMO_TITLES = ['Mr.', 'Ms.', 'Mx.', 'Dr.'] as const

function codeSeed(code: string): number {
  // Codes are hex-compatible (2-9, A-F); fall back if parse fails.
  const parsed = Number.parseInt(code, 16)
  if (!Number.isNaN(parsed)) return parsed
  let h = 0
  for (let i = 0; i < code.length; i++) {
    h = (h * 31 + code.charCodeAt(i)) >>> 0
  }
  return h
}

function pick<T>(list: readonly T[], seed: number, salt: number): T {
  return list[(seed + salt * 17) % list.length]
}

function emptyGuest() {
  return { title: '', firstName: '', lastName: '', suffix: '' }
}

/**
 * Build a fictional invitation party for any valid RSVP code.
 * Curated DEMO_GUESTS still win when the code matches them.
 */
export function generateDemoGuestFromCode(rawCode: string): GuestListDocument {
  const id = rawCode.trim().toUpperCase()
  const seed = codeSeed(id)
  const partyType = seed % 3 // 0 couple, 1 family, 2 single + plus-one

  const title1 = pick(DEMO_TITLES, seed, 1)
  const first1 = pick(DEMO_FIRST_NAMES, seed, 2)
  const last1 = pick(DEMO_LAST_NAMES, seed, 3)

  const guest1 = {
    title: title1,
    firstName: first1,
    lastName: last1,
    suffix: '',
  }

  let guest2 = emptyGuest()
  let additionalGuests: GuestListDocument['additionalGuests'] = []
  let guestCount = 1
  let names = `${title1} ${first1} ${last1}`.trim()

  if (partyType === 0) {
    // Couple
    const title2 = pick(DEMO_TITLES, seed, 4)
    const first2 = pick(DEMO_FIRST_NAMES, seed, 5)
    guest2 = {
      title: title2,
      firstName: first2,
      lastName: last1,
      suffix: '',
    }
    guestCount = 2
    names = `${first1} ${last1} & ${first2} ${last1}`
  } else if (partyType === 1) {
    // Family of 3–4
    const title2 = pick(DEMO_TITLES, seed, 4)
    const first2 = pick(DEMO_FIRST_NAMES, seed, 5)
    guest2 = {
      title: title2,
      firstName: first2,
      lastName: last1,
      suffix: '',
    }
    const kid1 = pick(DEMO_FIRST_NAMES, seed, 6)
    const kid2 = pick(DEMO_FIRST_NAMES, seed, 7)
    additionalGuests = [
      { title: '', firstName: kid1, lastName: last1, suffix: '' },
      { title: '', firstName: kid2, lastName: last1, suffix: '' },
    ]
    guestCount = 4
    names = `${first1} & ${first2} ${last1} and Family`
  } else {
    // Single with optional plus-one slot (named "Guest" in the form)
    guest2 = { title: '', firstName: 'Guest', lastName: '', suffix: '' }
    guestCount = 1
    names = `${title1} ${first1} ${last1}`.trim()
  }

  return {
    id,
    rsvpId: id,
    names,
    formalAddressing: names,
    sortName: last1,
    guest1,
    guest2,
    additionalGuests,
    guestCount,
    outOfTown: seed % 2 === 0 ? 'Yes' : 'No',
    address: {
      street: `${100 + (seed % 900)} Demo Way`,
      streetLine2: '',
      city: 'Seattle',
      stateProvince: 'WA',
      postalCode: '98101',
      country: 'USA',
      formatted: {
        line1: `${100 + (seed % 900)} Demo Way`,
        line2: 'Seattle, WA 98101',
        line3: 'USA',
        line4: '',
      },
    },
    email: `guest.${id.toLowerCase()}@example.com`,
    phone: `(555) 010-${String(seed % 10000).padStart(4, '0')}`,
    group: 'Demo Generated',
    list: 'Demo',
    giftReceived: '',
    thankYouSent: '',
  }
}

/** Curated guest if present; otherwise a generated party for any valid code. */
export function resolveDemoGuest(rawCode: string): GuestListDocument | null {
  const id = rawCode.trim().toUpperCase()
  if (!isValidRsvpCode(id)) return null

  const curated = DEMO_GUESTS.find((g) => g.id === id)
  if (curated) return curated

  return generateDemoGuestFromCode(id)
}
