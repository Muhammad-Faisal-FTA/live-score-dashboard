import{Router} from 'express';
import { createMatchSchema } from '../validation/matches.js';
import {matches} from "../db/schema.js" 
import {db} from "../db/db.js"

export const matchRouter = Router();

// Helper function to determine match status
function getMatchStatus(startTime, endTime) {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);
  
  if (now < start) {
    return 'scheduled';
  } else if (now >= start && now <= end) {
    return 'live';
  } else {
    return 'finished';
  }
}

// Define routes for matches
matchRouter.get('/', async (req, res) => {
  try {
    const allMatches = await db.select().from(matches);
    res.status(200).json({
      data: allMatches
    });
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({
      error: "Failed to fetch matches",
      detail: error.message
    });
  }
});

matchRouter.post('/post', async (req, res) => {
    const parsed = createMatchSchema.safeParse(req.body);
    
    if(!parsed.success){
      return res.status(400).json({
        error: "Invalid data",
        detail: JSON.stringify(parsed.error) ,
      })
    }

    try {
      const result = await db.insert(matches).values({
        sport: parsed.data.sport,
        homeTeam: parsed.data.homeTeam,
        awayTeam: parsed.data.awayTeam,
        startTime: new Date(parsed.data.startTime),
        endTime: new Date(parsed.data.endTime), 
        homeScore: parsed.data.homeScore ?? 0, 
        awayScore: parsed.data.awayScore ?? 0,
        matchStatus: getMatchStatus(parsed.data.startTime, parsed.data.endTime)
      }).returning();

      res.status(200).json({
        data: result[0]
      });
      
    } catch (error) {
      console.error('Error creating match:', error);
      res.status(500).json({
        error: "Failed to create match",
        detail: error.message
      });
    }
});
