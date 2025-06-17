import { CosmosClient } from '@azure/cosmos'
import { config } from '@/config'

// Create a singleton instance of the CosmosClient
const client = new CosmosClient({
  connectionString: config.cosmos.connectionString,
})

// Get the database and container
export const database = client.database(config.cosmos.databaseName)
export const container = database.container(config.cosmos.containerName)

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
    const { resources } = await container.items.query(querySpec).fetchAll()
    return resources[0] || null
  } catch (error) {
    console.error('Error fetching guest from Cosmos DB:', error)
    return null
  }
}
