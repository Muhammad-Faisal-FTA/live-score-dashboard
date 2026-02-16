import http from "http";
import { db } from "./db/db.js";
import { createUser, getAllUsers } from "./queries.js";

const PORT = 4000;


/* ---------------- HTTP Server ---------------- */

const server = http.createServer(async (req, res) => {
  try {
    // Test database connection
    const result = await db.execute('SELECT NOW()');
    console.log('Database connection successful:', result);

    // Example: Create a test user
    const testUser = await createUser('Test User', 'test@example.com');
    console.log('Test user created:', testUser);

    // Example: Get all users
    const allUsers = await getAllUsers();
    console.log('All users:', allUsers);

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("HTTP Server running on port 4000 with Drizzle + Neon connection. Test user created and retrieved.");
  } catch (error) {
    console.error('Database connection failed:', error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("HTTP Server running on port 4000, but database connection failed");
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
