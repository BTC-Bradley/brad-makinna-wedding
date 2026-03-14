import { NextRequest, NextResponse } from 'next/server'
import { CosmosClient } from '@azure/cosmos'
import { config } from '@/config'

const client = new CosmosClient({
  connectionString: config.cosmos.connectionString,
})

const DB_NAME = 'wedding'
const CONTAINER_NAME = 'guestbook'

async function getGuestbookContainer() {
  // Ensure database exists
  const { database } = await client.databases.createIfNotExists({ id: DB_NAME })
  // Ensure container exists
  const { container } = await database.containers.createIfNotExists({
    id: CONTAINER_NAME,
    partitionKey: { paths: ['/id'] },
  })
  return container
}

export interface GuestbookEntry {
  id: string
  name: string
  message: string
  submittedAt: string
  approved: boolean
}

export async function GET() {
  try {
    const container = await getGuestbookContainer()
    const { resources } = await container.items
      .query<GuestbookEntry>(
        'SELECT * FROM c WHERE c.approved = true ORDER BY c.submittedAt DESC',
      )
      .fetchAll()

    return NextResponse.json({ entries: resources })
  } catch (error) {
    console.error('Error fetching guestbook entries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch guestbook entries' },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, message } = body

    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Name and message are required' },
        { status: 400 },
      )
    }

    if (name.trim().length > 100) {
      return NextResponse.json({ error: 'Name is too long' }, { status: 400 })
    }

    if (message.trim().length > 1000) {
      return NextResponse.json(
        { error: 'Message is too long (max 1000 characters)' },
        { status: 400 },
      )
    }

    const container = await getGuestbookContainer()

    const entry: GuestbookEntry = {
      id: `gb_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      name: name.trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
      approved: true, // auto-approve for now; flip to false to add moderation
    }

    const { resource } = await container.items.create(entry)

    return NextResponse.json({ entry: resource }, { status: 201 })
  } catch (error) {
    console.error('Error submitting guestbook entry:', error)
    return NextResponse.json(
      { error: 'Failed to submit your message. Please try again.' },
      { status: 500 },
    )
  }
}
