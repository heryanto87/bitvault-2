import { z } from 'zod';
import { RiskProfileZodSchema } from '../collections/RiskProfile';

// Base risk profile schema without timestamps for input operations
const baseRiskProfileSchema = RiskProfileZodSchema.omit({ createdAt: true, updatedAt: true });

// Input schemas for risk profile operations
export const createRiskProfileSchema = baseRiskProfileSchema;

export const updateRiskProfileSchema = z.object({
  id: z.string().min(1, 'Risk Profile ID is required'),
}).merge(baseRiskProfileSchema.partial());

export const getRiskProfileSchema = z.object({
  id: z.string().min(1, 'Risk Profile ID is required'),
});

export const deleteRiskProfileSchema = z.object({
  id: z.string().min(1, 'Risk Profile ID is required'),
});

// Output schemas
export const riskProfileOutputSchema = z.object({
  _id: z.string(),
}).merge(RiskProfileZodSchema);

export const riskProfilesListOutputSchema = z.array(riskProfileOutputSchema);

// Type exports
export type CreateRiskProfileInput = z.infer<typeof createRiskProfileSchema>;
export type UpdateRiskProfileInput = z.infer<typeof updateRiskProfileSchema>;
export type GetRiskProfileInput = z.infer<typeof getRiskProfileSchema>;
export type DeleteRiskProfileInput = z.infer<typeof deleteRiskProfileSchema>;
export type RiskProfileOutput = z.infer<typeof riskProfileOutputSchema>;
export type RiskProfilesListOutput = z.infer<typeof riskProfilesListOutputSchema>;