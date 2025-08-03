import { z } from 'zod';
import { TradeZodSchema } from '../collections/Trade';

// Base trade schema without timestamps for input operations
const baseTradeSchema = TradeZodSchema.omit({ createdAt: true, updatedAt: true });

// Input schemas for trade operations
export const createTradeSchema = baseTradeSchema;

export const updateTradeSchema = z.object({
  id: z.string().min(1, 'Trade ID is required'),
}).merge(baseTradeSchema.partial());

export const getTradeSchema = z.object({
  id: z.string().min(1, 'Trade ID is required'),
});

export const deleteTradeSchema = z.object({
  id: z.string().min(1, 'Trade ID is required'),
});

// Get trades by user ID
export const getTradesByUserSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
});

// Get trades by position ID
export const getTradesByPositionSchema = z.object({
  positionId: z.string().min(1, 'Position ID is required'),
});

// Get trades by symbol ID
export const getTradesBySymbolSchema = z.object({
  symbolId: z.string().min(1, 'Symbol ID is required'),
});

// Output schemas
export const tradeOutputSchema = z.object({
  _id: z.string(),
}).merge(TradeZodSchema);

export const tradesListOutputSchema = z.array(tradeOutputSchema);

// Type exports
export type CreateTradeInput = z.infer<typeof createTradeSchema>;
export type UpdateTradeInput = z.infer<typeof updateTradeSchema>;
export type GetTradeInput = z.infer<typeof getTradeSchema>;
export type DeleteTradeInput = z.infer<typeof deleteTradeSchema>;
export type GetTradesByUserInput = z.infer<typeof getTradesByUserSchema>;
export type GetTradesByPositionInput = z.infer<typeof getTradesByPositionSchema>;
export type GetTradesBySymbolInput = z.infer<typeof getTradesBySymbolSchema>;
export type TradeOutput = z.infer<typeof tradeOutputSchema>;
export type TradesListOutput = z.infer<typeof tradesListOutputSchema>;