import { CosmosClient } from '@azure/cosmos'
import { config } from '@/config'
import { RSVPSubmission } from '@/interfaces/guest'

// Create a singleton instance of the CosmosClient
const client = new CosmosClient({
  connectionString: config.cosmos.connectionString,
})

// Get the database and container
export const database = client.database(config.cosmos.databaseName)
export const guestsContainer = database.container(config.cosmos.containerName)
export const rsvpsContainer = database.container(
  config.cosmos.rsvpsContainerName,
)

// Helper function to get a guest by ID
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

// Helper function to find existing RSVP by guestId
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

// Helper function to save RSVP submission (upsert if existing)
export async function saveRSVPSubmission(rsvpData: RSVPSubmission, isUpdate = false) {
  try {
    if (isUpdate) {
      const { resource } = await rsvpsContainer.items.upsert(rsvpData)
      return resource
    }
    const { resource } = await rsvpsContainer.items.create(rsvpData)
    return resource
  } catch (error) {
    console.error('Error saving RSVP submission to Cosmos DB:', error)
    throw error
  }
}
