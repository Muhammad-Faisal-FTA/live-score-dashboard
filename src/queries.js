import { db } from './db/db.js';
import { matches } from './db/schema.js';
import { eq } from 'drizzle-orm';

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
    const result = await db.select().from(matches).where(eq(matches.id, id));
    console.log('Match found:', result[0]);
    return result[0];
  } catch (error) {
    console.error('Error fetching match:', error);
    throw error;
  }
}

// Example: Update match
export async function updateMatch(id, updates) {
  try {
    const result = await db.update(matches)
      .set(updates)
      .where(eq(matches.id, id))
      .returning();
    
    console.log('Match updated:', result[0]);
    return result[0];
  } catch (error) {
    console.error('Error updating match:', error);
    throw error;
  }
}

// Example: Delete match
export async function deleteMatch(id) {
  try {
    const result = await db.delete(matches).where(eq(matches.id, id)).returning();
    console.log('Match deleted:', result[0]);
    return result[0];
  } catch (error) {
    console.error('Error deleting match:', error);
    throw error;
  }
}

// User functions (using matches table as a simple user storage for demo purposes)
export async function createUser(userData) {
  try {
    // For now, we'll use the matches table to simulate user storage
    // In a real application, you'd have a separate users table
    const result = await db.insert(matches).values({
      sport: userData.username || 'user',
      homeTeam: userData.email || 'user@example.com',
      awayTeam: userData.name || 'User',
      status: 'scheduled', // Use a valid enum value
      startTime: new Date(),
      endTime: null
    }).returning();
    
    console.log('User created:', result[0]);
    return result[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function getAllUsers() {
  try {
    // Filter matches where sport is 'user' to simulate user records
    const result = await db.select().from(matches).where(eq(matches.sport, 'user'));
    console.log('All users:', result);
    return result;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}
