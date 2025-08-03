import { createTRPCRouter, publicProcedure } from '../trpc';
import {
  createVaultSchema,
  updateVaultSchema,
  getVaultSchema,
  deleteVaultSchema,
  getVaultsByUserSchema,
  vaultOutputSchema,
  vaultsListOutputSchema,
} from '../../schemas/vault';
import Vault from '../../collections/Vault';
import User from '../../collections/User';
import { TRPCError } from '@trpc/server';

export const vaultRouter = createTRPCRouter({
  // Create a new vault
  create: publicProcedure
    .meta({ description: 'Create a new vault. Only users with trader role can create vaults.' })
    .input(createVaultSchema)
    .output(vaultOutputSchema)
    .mutation(async ({ input }) => {
      try {
        // Verify user exists and has trader role
        const user = await User.findById(input.userId);
        if (!user) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User not found',
          });
        }
        if (user.role !== 'trader') {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Only traders can create vaults',
          });
        }

        const vault = new Vault(input);
        const savedVault = await vault.save();
        return {
          _id: savedVault._id.toString(),
          userId: savedVault.userId,
          name: savedVault.name,
          picture: savedVault.picture,
          balance: savedVault.balance,
          profitShareRatio: savedVault.profitShareRatio,
          payoutCycle: savedVault.payoutCycle,
          createdAt: savedVault.createdAt,
          updatedAt: savedVault.updatedAt,
        };
      } catch (error: unknown) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create vault',
        });
      }
    }),

  // Get all vaults
  getAll: publicProcedure
    .meta({ description: 'Retrieve all vaults from the database, sorted by creation date (newest first).' })
    .output(vaultsListOutputSchema)
    .query(async () => {
      try {
        const vaults = await Vault.find().sort({ createdAt: -1 });
        return vaults.map(vault => ({
          _id: vault._id.toString(),
          userId: vault.userId,
          name: vault.name,
          picture: vault.picture,
          balance: vault.balance,
          profitShareRatio: vault.profitShareRatio,
          payoutCycle: vault.payoutCycle,
          createdAt: vault.createdAt,
          updatedAt: vault.updatedAt,
        }));
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch vaults',
        });
      }
    }),

  // Get vault by ID
  getById: publicProcedure
    .meta({ description: 'Retrieve a specific vault by their unique ID.' })
    .input(getVaultSchema)
    .output(vaultOutputSchema)
    .query(async ({ input }) => {
      try {
        const vault = await Vault.findById(input.id);
        if (!vault) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Vault not found',
          });
        }
        return {
          _id: vault._id.toString(),
          userId: vault.userId,
          name: vault.name,
          picture: vault.picture,
          balance: vault.balance,
          profitShareRatio: vault.profitShareRatio,
          payoutCycle: vault.payoutCycle,
          createdAt: vault.createdAt,
          updatedAt: vault.updatedAt,
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch vault',
        });
      }
    }),

  // Get vaults by user ID
  getByUserId: publicProcedure
    .meta({ description: 'Retrieve all vaults owned by a specific user.' })
    .input(getVaultsByUserSchema)
    .output(vaultsListOutputSchema)
    .query(async ({ input }) => {
      try {
        const vaults = await Vault.find({ userId: input.userId }).sort({ createdAt: -1 });
        return vaults.map(vault => ({
          _id: vault._id.toString(),
          userId: vault.userId,
          name: vault.name,
          picture: vault.picture,
          balance: vault.balance,
          profitShareRatio: vault.profitShareRatio,
          payoutCycle: vault.payoutCycle,
          createdAt: vault.createdAt,
          updatedAt: vault.updatedAt,
        }));
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch user vaults',
        });
      }
    }),

  // Update vault
  update: publicProcedure
    .meta({ description: 'Update an existing vault\'s information. All fields are optional except ID.' })
    .input(updateVaultSchema)
    .output(vaultOutputSchema)
    .mutation(async ({ input }) => {
      try {
        const { id, ...updateData } = input;
        const vault = await Vault.findByIdAndUpdate(
          id,
          updateData,
          { new: true, runValidators: true }
        );
        if (!vault) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Vault not found',
          });
        }
        return {
          _id: vault._id.toString(),
          userId: vault.userId,
          name: vault.name,
          picture: vault.picture,
          balance: vault.balance,
          profitShareRatio: vault.profitShareRatio,
          payoutCycle: vault.payoutCycle,
          createdAt: vault.createdAt,
          updatedAt: vault.updatedAt,
        };
      } catch (error: unknown) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update vault',
        });
      }
    }),

  // Delete vault
  delete: publicProcedure
    .meta({ description: 'Permanently delete a vault from the database by their ID.' })
    .input(deleteVaultSchema)
    .output(vaultOutputSchema)
    .mutation(async ({ input }) => {
      try {
        const vault = await Vault.findByIdAndDelete(input.id);
        if (!vault) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Vault not found',
          });
        }
        return {
          _id: vault._id.toString(),
          userId: vault.userId,
          name: vault.name,
          picture: vault.picture,
          balance: vault.balance,
          profitShareRatio: vault.profitShareRatio,
          payoutCycle: vault.payoutCycle,
          createdAt: vault.createdAt,
          updatedAt: vault.updatedAt,
        };
      } catch (error: unknown) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to delete vault',
        });
      }
    }),
});