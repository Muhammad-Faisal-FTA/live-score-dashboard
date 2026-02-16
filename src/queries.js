import { db } from './db/db.js';
import { users } from './db/schema.js';

// Example: Insert a new user
export async function createUser(name, email) {
  try {
    const result = await db.insert(users).values({
      name,
      email,
    }).returning();
    
    console.log('User created:', result[0]);
    return result[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Example: Get all users
export async function getAllUsers() {
  try {
    const result = await db.select().from(users);
    console.log('All users:', result);
    return result;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

// Example: Get user by ID
export async function getUserById(id) {
  try {
    const result = await db.select().from(users).where(users.id.eq(id));
    console.log('User found:', result[0]);
    return result[0];
  } catch (error) {
    console.error('Error fetching user:', error);
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