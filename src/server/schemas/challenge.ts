import { z } from 'zod';
import { ChallengeZodSchema } from '../collections/Challenge';

// Base challenge schema without timestamps for input operations
const baseChallengeSchema = ChallengeZodSchema.omit({ createdAt: true, updatedAt: true });

// Input schemas for challenge operations
export const createChallengeSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  riskProfileId: z.string().min(1, 'Risk Profile ID is required'),
});

export const updateChallengeSchema = z.object({
  id: z.string().min(1, 'Challenge ID is required'),
}).merge(baseChallengeSchema.partial());

export const getChallengeSchema = z.object({
  id: z.string().min(1, 'Challenge ID is required'),
});

export const deleteChallengeSchema = z.object({
  id: z.string().min(1, 'Challenge ID is required'),
});

// Get challenges by user ID
export const getChallengesByUserSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
});

// Output schemas
export const challengeOutputSchema = z.object({
  _id: z.string(),
}).merge(ChallengeZodSchema);

export const challengesListOutputSchema = z.array(challengeOutputSchema);

// Type exports
export type CreateChallengeInput = z.infer<typeof createChallengeSchema>;
export type UpdateChallengeInput = z.infer<typeof updateChallengeSchema>;
export type GetChallengeInput = z.infer<typeof getChallengeSchema>;
export type DeleteChallengeInput = z.infer<typeof deleteChallengeSchema>;
export type GetChallengesByUserInput = z.infer<typeof getChallengesByUserSchema>;
export type ChallengeOutput = z.infer<typeof challengeOutputSchema>;
export type ChallengesListOutput = z.infer<typeof challengesListOutputSchema>;