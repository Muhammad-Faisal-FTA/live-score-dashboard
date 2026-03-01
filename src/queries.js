import { db } from './db/db.js';
import { matches } from './db/schema.js';

// Example: Insert a new match
export async function createMatch(sport, homeTeam, awayTeam, status, startTime, endTime) {
  try {
    const result = await db.insert(matches).values({
      sport,
      homeTeam,
      awayTeam,
      status,
      startTime,
      endTime
    }).returning();
    
    console.log('Match created:', result[0]);
    return result[0];
  } catch (error) {
    console.error('Error creating match:', error);
    throw error;
  }
}

// Example: Get all matches
export async function getAllMatches() {
  try {
    const result = await db.select().from(matches);
    console.log('All matches:', result);
    return result;
  } catch (error) {
    console.error('Error fetching matches:', error);
    throw error;
  }
}

// Example: Get match by ID
export async function getMatchById(id) {
  try {
    const result = await db.select().from(matches).where(matches.id.eq(id));
    console.log('Match found:', result[0]);
    return result[0];
  } catch (error) {
    console.error('Error fetching match:', error);
    throw error;
  }
}

// Example: Update user
export async function updateUser(id, updates) {
  try {
    const result = await db.update(users)
      .set(updates)
      .where(users.id.eq(id))
      .returning();
    
    console.log('User updated:', result[0]);
    return result[0];
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

// Example: Delete user
export async function deleteUser(id) {
  try {
    const result = await db.delete(users).where(users.id.eq(id)).returning();
    console.log('User deleted:', result[0]);
    return result[0];
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}