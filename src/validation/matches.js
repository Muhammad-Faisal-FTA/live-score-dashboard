import { z } from 'zod';

// Create match status schema with key-value pairs for SCHEDULED, LIVE, and FINISHED in lowercase
export const matchStatusSchema = z.object({
  SCHEDULED: z.literal('scheduled'),
  LIVE: z.literal('live'),
  FINISHED: z.literal('finished'),
});

// Create list matches query schema that validates an optional limit as a coerced positive integer with a maximum of 100
export const listMatchesQuerySchema = z.object({
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .pipe(z.number().int().positive().max(100).optional()),
});

// Create match ID params schema that validates a required id as a coerced positive integer
export const matchIdParamsSchema = z.object({
  id: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive()),
});

// Create match schema that validates sport, homeTeam, and awayTeam as non-empty strings
export const createMatchSchema = z.object({
  sport: z.string().min(1, 'Sport is required'),
  homeTeam: z.string().min(1, 'Home team is required'),
  awayTeam: z.string().min(1, 'Away team is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  homeScore: z
    .number()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .pipe(z.number().int().nonnegative().optional()),
  awayScore: z
    .number()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .pipe(z.number().int().nonnegative().optional()),
}).refine(
  (data) => {
    // Add refinement to verify startTime and endTime are valid ISO date strings
    const startTime = new Date(data.startTime);
    const endTime = new Date(data.endTime);
    return !isNaN(startTime.getTime()) && !isNaN(endTime.getTime());
  },
  {
    message: 'Start time and end time must be valid ISO date strings',
    path: ['startTime'],
  },
).superRefine((data, ctx) => {
  // Add superRefine check to ensure endTime is chronologically after startTime
  const startTime = new Date(data.startTime);
  const endTime = new Date(data.endTime);
  
  if (endTime <= startTime) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'End time must be chronologically after start time',
      path: ['endTime'],
    });
  }
});

// Create update match schema that requires homeScore and awayScore as coerced non-negative integers
export const updateMatchSchema = z.object({
  homeScore: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().nonnegative()),
  awayScore: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().nonnegative()),
});

