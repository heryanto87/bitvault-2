import { createTRPCRouter, publicProcedure } from '../trpc';
import {
  createRiskProfileSchema,
  updateRiskProfileSchema,
  getRiskProfileSchema,
  deleteRiskProfileSchema,
  riskProfileOutputSchema,
  riskProfilesListOutputSchema,
} from '../../schemas/riskProfile';
import RiskProfile from '../../collections/RiskProfile';
import { TRPCError } from '@trpc/server';

export const riskProfileRouter = createTRPCRouter({
  // Create a new risk profile
  create: publicProcedure
    .meta({ description: 'Create a new risk profile with trading parameters and challenge settings.' })
    .input(createRiskProfileSchema)
    .output(riskProfileOutputSchema)
    .mutation(async ({ input }) => {
      try {
        const riskProfile = new RiskProfile(input);
        const savedRiskProfile = await riskProfile.save();
        return {
          _id: savedRiskProfile._id.toString(),
          name: savedRiskProfile.name,
          description: savedRiskProfile.description,
          image: savedRiskProfile.image,
          maxDrawdown: savedRiskProfile.maxDrawdown,
          challengeProfitTarget: savedRiskProfile.challengeProfitTarget,
          challengeTimeBox: savedRiskProfile.challengeTimeBox,
          createdAt: savedRiskProfile.createdAt,
          updatedAt: savedRiskProfile.updatedAt,
        };
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create risk profile',
        });
      }
    }),

  // Get all risk profiles
  getAll: publicProcedure
    .meta({ description: 'Retrieve all risk profiles from the database, sorted by creation date (newest first).' })
    .output(riskProfilesListOutputSchema)
    .query(async () => {
      try {
        const riskProfiles = await RiskProfile.find().sort({ createdAt: -1 });
        return riskProfiles.map(riskProfile => ({
          _id: riskProfile._id.toString(),
          name: riskProfile.name,
          description: riskProfile.description,
          image: riskProfile.image,
          maxDrawdown: riskProfile.maxDrawdown,
          challengeProfitTarget: riskProfile.challengeProfitTarget,
          challengeTimeBox: riskProfile.challengeTimeBox,
          createdAt: riskProfile.createdAt,
          updatedAt: riskProfile.updatedAt,
        }));
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch risk profiles',
        });
      }
    }),

  // Get risk profile by ID
  getById: publicProcedure
    .meta({ description: 'Retrieve a specific risk profile by their unique ID.' })
    .input(getRiskProfileSchema)
    .output(riskProfileOutputSchema)
    .query(async ({ input }) => {
      try {
        const riskProfile = await RiskProfile.findById(input.id);
        if (!riskProfile) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Risk profile not found',
          });
        }
        return {
          _id: riskProfile._id.toString(),
          name: riskProfile.name,
          description: riskProfile.description,
          image: riskProfile.image,
          maxDrawdown: riskProfile.maxDrawdown,
          challengeProfitTarget: riskProfile.challengeProfitTarget,
          challengeTimeBox: riskProfile.challengeTimeBox,
          createdAt: riskProfile.createdAt,
          updatedAt: riskProfile.updatedAt,
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch risk profile',
        });
      }
    }),

  // Update risk profile
  update: publicProcedure
    .meta({ description: 'Update an existing risk profile\'s information. All fields are optional except ID.' })
    .input(updateRiskProfileSchema)
    .output(riskProfileOutputSchema)
    .mutation(async ({ input }) => {
      try {
        const { id, ...updateData } = input;
        const riskProfile = await RiskProfile.findByIdAndUpdate(
          id,
          updateData,
          { new: true, runValidators: true }
        );
        if (!riskProfile) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Risk profile not found',
          });
        }
        return {
          _id: riskProfile._id.toString(),
          name: riskProfile.name,
          description: riskProfile.description,
          image: riskProfile.image,
          maxDrawdown: riskProfile.maxDrawdown,
          challengeProfitTarget: riskProfile.challengeProfitTarget,
          challengeTimeBox: riskProfile.challengeTimeBox,
          createdAt: riskProfile.createdAt,
          updatedAt: riskProfile.updatedAt,
        };
      } catch (error: unknown) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update risk profile',
        });
      }
    }),

  // Delete risk profile
  delete: publicProcedure
    .meta({ description: 'Permanently delete a risk profile from the database by their ID.' })
    .input(deleteRiskProfileSchema)
    .output(riskProfileOutputSchema)
    .mutation(async ({ input }) => {
      try {
        const riskProfile = await RiskProfile.findByIdAndDelete(input.id);
        if (!riskProfile) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Risk profile not found',
          });
        }
        return {
          _id: riskProfile._id.toString(),
          name: riskProfile.name,
          description: riskProfile.description,
          image: riskProfile.image,
          maxDrawdown: riskProfile.maxDrawdown,
          challengeProfitTarget: riskProfile.challengeProfitTarget,
          challengeTimeBox: riskProfile.challengeTimeBox,
          createdAt: riskProfile.createdAt,
          updatedAt: riskProfile.updatedAt,
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to delete risk profile',
        });
      }
    }),
});