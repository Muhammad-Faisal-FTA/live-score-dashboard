# Drizzle + Neon Connection Setup

This project demonstrates how to connect Drizzle ORM to Neon PostgreSQL database.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install drizzle-orm neon
```

### 2. Environment Configuration

Create a `.env` file with your Neon database URL:

```env
NEON_DATABASE_URL="postgresql://username:password@ep-quiet-forest-123456.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

### 3. Database Connection

The connection is established in `src/db/db.js`:

```javascript
import { neon } from 'neon';
import { drizzle } from 'drizzle-orm/neon-http';

const databaseUrl = process.env.NEON_DATABASE_URL;
const sql = neon(databaseUrl);
export const db = drizzle(sql);
```

### 4. Schema Definition

Database schema is defined in `src/db/schema.js`:

```javascript
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});
```

### 5. Usage Examples

Query functions are available in `src/queries.js`:

```javascript
import { createUser, getAllUsers } from './queries.js';

// Create a user
const user = await createUser('John Doe', 'john@example.com');

// Get all users
const users = await getAllUsers();
```

## Database Migrations

Install Drizzle Kit for migrations:

```bash
npm install drizzle-kit --save-dev
```

Available migration commands:

```bash
# Generate migration files
npm run db:generate

# Push schema to database
npm run db:push

# Run migrations
npm run db:migrate
```

## Running the Project

```bash
npm run dev
```

The server will start on port 4000 and test the database connection automatically.
# live-score-dashboard
