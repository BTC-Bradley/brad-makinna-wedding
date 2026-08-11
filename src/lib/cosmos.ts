import { CosmosClient } from '@azure/cosmos'
import { config } from '@/config'
import { RSVPSubmission } from '@/interfaces/guest'

/**
 * Azure Cosmos DB access. Only used when DEMO_MODE is false.
 * Prefer `@/lib/data-store` from app code so demo mode stays isolated.
 */

if (config.demoMode) {
  throw new Error(
    'src/lib/cosmos.ts should not be imported while DEMO_MODE is enabled. Use @/lib/data-store instead.',
  )
}

if (!config.cosmos) {
  throw new Error(
    'Cosmos is not configured. Set COSMOS_CONNECTION_STRING, COSMOS_DATABASE_NAME, COSMOS_CONTAINER_NAME, and COSMOS_RSVPS_CONTAINER_NAME.',
  )
}

const client = new CosmosClient({
  connectionString: config.cosmos.connectionString,
})

export const database = client.database(config.cosmos.databaseName)
export const guestsContainer = database.container(config.cosmos.containerName)
export const rsvpsContainer = database.container(
  config.cosmos.rsvpsContainerName,
)

export async function getGuestById(id: string) {
  try {
    const querySpec = {
      query: 'SELECT * FROM c WHERE c.id = @id',
      parameters: [
        {
          name: '@id',
          value: id,
        },
      ],
    }
    const { resources } = await guestsContainer.items
      .query(querySpec)
      .fetchAll()
    return resources[0] || null
  } catch (error) {
    console.error('Error fetching guest from Cosmos DB:', error)
    return null
  }
}

export async function getExistingRSVP(guestId: string) {
  try {
    const { resources } = await rsvpsContainer.items
      .query({
        query: 'SELECT * FROM c WHERE c.guestId = @guestId',
        parameters: [{ name: '@guestId', value: guestId }],
      })
      .fetchAll()
    return resources[0] || null
  } catch (error) {
    console.error('Error checking existing RSVP:', error)
    return null
  }
}

export async function saveRSVPSubmission(rsvpData: RSVPSubmission) {
  try {
    const payload = {
      ...rsvpData,
      group: rsvpData.group ?? 'Demo',
    }
    const { resource } = await rsvpsContainer.items.create(payload)
    return resource
  } catch (error) {
    console.error('Error saving RSVP submission to Cosmos DB:', error)
    throw error
  }
}
