import { neon } from 'neon';
import { drizzle } from 'drizzle-orm/neon-http';

// Get the database URL from environment variables
const databaseUrl = process.env.NEON_DATABASE_URL;

if (!databaseUrl) {
  throw new Error('NEON_DATABASE_URL environment variable is required');
}

// Create a Neon connection
const sql = neon(databaseUrl);

// Create a Drizzle ORM instance
export const db = drizzle(sql);

export { sql };