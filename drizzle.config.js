export default {
  schema: './src/db/schema.js',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEON_DATABASE_URL,  // Changed from 'connectionString' to 'url'
  },
  verbose: true,
  strict: true,
};