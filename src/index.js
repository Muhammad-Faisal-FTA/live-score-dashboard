import express from "express";    
import { db } from "./db/db.js";
import {matchRouter} from './routes/match.route.js';

const app = express();
const PORT = 4051;

// Middleware to parse JSON
app.use(express.json());

// Test database connection endpoint
app.get('/', async (req, res) => {
  try {
    const result = await db.execute('SELECT NOW()');
    console.log('Database connection successful:', result);
    res.status(200).json({
      message: `HTTP Server running on port ${PORT} with Drizzle + Neon connection. Test match created and retrieved.`,
      status: 'success'
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({
      message: `HTTP Server running on port ${PORT}, but database connection failed`,
      error: error.message,
      status: 'error'
    });
  }
});

// matches api routes
app.use('/api/matches', matchRouter);

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on localhost:${PORT}`);
});
