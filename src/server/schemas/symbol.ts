import { z } from 'zod';
import { SymbolZodSchema } from '../collections/Symbol';

// Base symbol schema without timestamps for input operations
const baseSymbolSchema = SymbolZodSchema.omit({ createdAt: true, updatedAt: true });

// Input schemas for symbol operations
export const createSymbolSchema = baseSymbolSchema;

export const updateSymbolSchema = z.object({
  id: z.string().min(1, 'Symbol ID is required'),
}).merge(baseSymbolSchema.partial());

export const getSymbolSchema = z.object({
  id: z.string().min(1, 'Symbol ID is required'),
});

export const deleteSymbolSchema = z.object({
  id: z.string().min(1, 'Symbol ID is required'),
});

// Output schemas
export const symbolOutputSchema = z.object({
  _id: z.string(),
}).merge(SymbolZodSchema);

export const symbolsListOutputSchema = z.array(symbolOutputSchema);

// Type exports
export type CreateSymbolInput = z.infer<typeof createSymbolSchema>;
export type UpdateSymbolInput = z.infer<typeof updateSymbolSchema>;
export type GetSymbolInput = z.infer<typeof getSymbolSchema>;
export type DeleteSymbolInput = z.infer<typeof deleteSymbolSchema>;
export type SymbolOutput = z.infer<typeof symbolOutputSchema>;
export type SymbolsListOutput = z.infer<typeof symbolsListOutputSchema>;