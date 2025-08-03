import { z } from 'zod';
import { VaultZodSchema } from '../collections/Vault';

// Base vault schema without timestamps for input operations
const baseVaultSchema = VaultZodSchema.omit({ createdAt: true, updatedAt: true });

// Input schemas for vault operations
export const createVaultSchema = baseVaultSchema;

export const updateVaultSchema = z.object({
  id: z.string().min(1, 'Vault ID is required'),
}).merge(baseVaultSchema.partial());

export const getVaultSchema = z.object({
  id: z.string().min(1, 'Vault ID is required'),
});

export const deleteVaultSchema = z.object({
  id: z.string().min(1, 'Vault ID is required'),
});

// Get vaults by user ID
export const getVaultsByUserSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
});

// Output schemas
export const vaultOutputSchema = z.object({
  _id: z.string(),
}).merge(VaultZodSchema);

export const vaultsListOutputSchema = z.array(vaultOutputSchema);

// Type exports
export type CreateVaultInput = z.infer<typeof createVaultSchema>;
export type UpdateVaultInput = z.infer<typeof updateVaultSchema>;
export type GetVaultInput = z.infer<typeof getVaultSchema>;
export type DeleteVaultInput = z.infer<typeof deleteVaultSchema>;
export type GetVaultsByUserInput = z.infer<typeof getVaultsByUserSchema>;
export type VaultOutput = z.infer<typeof vaultOutputSchema>;
export type VaultsListOutput = z.infer<typeof vaultsListOutputSchema>;