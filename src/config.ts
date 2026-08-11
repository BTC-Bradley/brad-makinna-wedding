const getEnvVar = (key: string): string => {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

const getEnvVarOptional = (key: string): string | undefined => {
  const value = process.env[key]
  return value && value.length > 0 ? value : undefined
}

/**
 * Portfolio / resume demo mode.
 *
 * Default is ON so the public site never depends on real guest PII.
 * Set DEMO_MODE=false only if you intentionally reconnect a real Cosmos guest list.
 */
const demoModeEnv = process.env.DEMO_MODE
export const isDemoMode =
  demoModeEnv === undefined
    ? true
    : demoModeEnv === 'true' || demoModeEnv === '1'

const hasCosmosConfig = Boolean(
  getEnvVarOptional('COSMOS_CONNECTION_STRING') &&
    getEnvVarOptional('COSMOS_DATABASE_NAME') &&
    getEnvVarOptional('COSMOS_CONTAINER_NAME') &&
    getEnvVarOptional('COSMOS_RSVPS_CONTAINER_NAME'),
)

export const config = {
  /** When true, guests/RSVPs come from in-repo demo data (no real PII). */
  demoMode: isDemoMode,
  /**
   * RSVP submissions are accepted when demo mode is on, or when explicitly re-opened.
   * Kept as a separate flag so a non-demo rebuild can close RSVPs again after a deadline.
   */
  rsvpOpen:
    isDemoMode ||
    process.env.RSVP_OPEN === 'true' ||
    process.env.RSVP_OPEN === '1',
  cosmos: hasCosmosConfig
    ? {
        connectionString: getEnvVar('COSMOS_CONNECTION_STRING'),
        databaseName: getEnvVar('COSMOS_DATABASE_NAME'),
        containerName: getEnvVar('COSMOS_CONTAINER_NAME'),
        rsvpsContainerName: getEnvVar('COSMOS_RSVPS_CONTAINER_NAME'),
      }
    : null,
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
} as const

export type Config = typeof config
