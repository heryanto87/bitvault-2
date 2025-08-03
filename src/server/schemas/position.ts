import { z } from 'zod';
import { PositionZodSchema } from '../collections/Position';

// Base position schema without timestamps for input operations
const basePositionSchema = PositionZodSchema.omit({ createdAt: true, updatedAt: true });

// Input schemas for position operations
export const createPositionSchema = basePositionSchema;

export const updatePositionSchema = z.object({
  id: z.string().min(1, 'Position ID is required'),
}).merge(basePositionSchema.partial());

export const getPositionSchema = z.object({
  id: z.string().min(1, 'Position ID is required'),
});

export const deletePositionSchema = z.object({
  id: z.string().min(1, 'Position ID is required'),
});

// Get positions by user ID
export const getPositionsByUserSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
});

// Get positions by symbol ID
export const getPositionsBySymbolSchema = z.object({
  symbolId: z.string().min(1, 'Symbol ID is required'),
});

// Close position schema
export const closePositionSchema = z.object({
  id: z.string().min(1, 'Position ID is required'),
});

// Output schemas
export const positionOutputSchema = z.object({
  _id: z.string(),
}).merge(PositionZodSchema);

export const positionsListOutputSchema = z.array(positionOutputSchema);

// Type exports
export type CreatePositionInput = z.infer<typeof createPositionSchema>;
export type UpdatePositionInput = z.infer<typeof updatePositionSchema>;
export type GetPositionInput = z.infer<typeof getPositionSchema>;
export type DeletePositionInput = z.infer<typeof deletePositionSchema>;
export type GetPositionsByUserInput = z.infer<typeof getPositionsByUserSchema>;
export type GetPositionsBySymbolInput = z.infer<typeof getPositionsBySymbolSchema>;
export type ClosePositionInput = z.infer<typeof closePositionSchema>;
export type PositionOutput = z.infer<typeof positionOutputSchema>;
export type PositionsListOutput = z.infer<typeof positionsListOutputSchema>;