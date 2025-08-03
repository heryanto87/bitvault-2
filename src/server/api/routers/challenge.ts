import { createTRPCRouter, publicProcedure } from '../trpc';
import {
  createChallengeSchema,
  updateChallengeSchema,
  getChallengeSchema,
  deleteChallengeSchema,
  getChallengesByUserSchema,
  challengeOutputSchema,
  challengesListOutputSchema,
} from '../../schemas/challenge';
import Challenge from '../../collections/Challenge';
import User from '../../collections/User';
import RiskProfile from '../../collections/RiskProfile';
import { TRPCError } from '@trpc/server';

export const challengeRouter = createTRPCRouter({
  // Create a new challenge
  create: publicProcedure
    .meta({ description: 'Create a new challenge. Auto-generates startDate, endDate, and balance based on risk profile.' })
    .input(createChallengeSchema)
    .output(challengeOutputSchema)
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
            message: 'Only traders can create challenges',
          });
        }

        // Verify risk profile exists
        const riskProfile = await RiskProfile.findById(input.riskProfileId);
        if (!riskProfile) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Risk profile not found',
          });
        }

        // Auto-generate challenge data
        const startDate = new Date();
        const endDate = new Date(startDate.getTime() + (riskProfile.challengeTimeBox * 24 * 60 * 60 * 1000));
        const balance = 10000; // Default balance

        const challengeData = {
          ...input,
          balance,
          startDate,
          endDate,
        };

        const challenge = new Challenge(challengeData);
        const savedChallenge = await challenge.save();
        return {
          _id: savedChallenge._id.toString(),
          userId: savedChallenge.userId,
          riskProfileId: savedChallenge.riskProfileId,
          balance: savedChallenge.balance,
          startDate: savedChallenge.startDate,
          endDate: savedChallenge.endDate,
          createdAt: savedChallenge.createdAt,
          updatedAt: savedChallenge.updatedAt,
        };
      } catch (error: unknown) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create challenge',
        });
      }
    }),

  // Get all challenges
  getAll: publicProcedure
    .meta({ description: 'Retrieve all challenges from the database, sorted by creation date (newest first).' })
    .output(challengesListOutputSchema)
    .query(async () => {
      try {
        const challenges = await Challenge.find().sort({ createdAt: -1 });
        return challenges.map(challenge => ({
          _id: challenge._id.toString(),
          userId: challenge.userId,
          riskProfileId: challenge.riskProfileId,
          balance: challenge.balance,
          startDate: challenge.startDate,
          endDate: challenge.endDate,
          createdAt: challenge.createdAt,
          updatedAt: challenge.updatedAt,
        }));
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch challenges',
        });
      }
    }),

  // Get challenge by ID
  getById: publicProcedure
    .meta({ description: 'Retrieve a specific challenge by their unique ID.' })
    .input(getChallengeSchema)
    .output(challengeOutputSchema)
    .query(async ({ input }) => {
      try {
        const challenge = await Challenge.findById(input.id);
        if (!challenge) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Challenge not found',
          });
        }
        return {
          _id: challenge._id.toString(),
          userId: challenge.userId,
          riskProfileId: challenge.riskProfileId,
          balance: challenge.balance,
          startDate: challenge.startDate,
          endDate: challenge.endDate,
          createdAt: challenge.createdAt,
          updatedAt: challenge.updatedAt,
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch challenge',
        });
      }
    }),

  // Get challenges by user ID
  getByUserId: publicProcedure
    .meta({ description: 'Retrieve all challenges owned by a specific user.' })
    .input(getChallengesByUserSchema)
    .output(challengesListOutputSchema)
    .query(async ({ input }) => {
      try {
        const challenges = await Challenge.find({ userId: input.userId }).sort({ createdAt: -1 });
        return challenges.map(challenge => ({
          _id: challenge._id.toString(),
          userId: challenge.userId,
          riskProfileId: challenge.riskProfileId,
          balance: challenge.balance,
          startDate: challenge.startDate,
          endDate: challenge.endDate,
          createdAt: challenge.createdAt,
          updatedAt: challenge.updatedAt,
        }));
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch user challenges',
        });
      }
    }),

  // Update challenge
  update: publicProcedure
    .meta({ description: 'Update an existing challenge\'s information. All fields are optional except ID.' })
    .input(updateChallengeSchema)
    .output(challengeOutputSchema)
    .mutation(async ({ input }) => {
      try {
        const { id, ...updateData } = input;
        const challenge = await Challenge.findByIdAndUpdate(
          id,
          updateData,
          { new: true, runValidators: true }
        );
        if (!challenge) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Challenge not found',
          });
        }
        return {
          _id: challenge._id.toString(),
          userId: challenge.userId,
          riskProfileId: challenge.riskProfileId,
          balance: challenge.balance,
          startDate: challenge.startDate,
          endDate: challenge.endDate,
          createdAt: challenge.createdAt,
          updatedAt: challenge.updatedAt,
        };
      } catch (error: unknown) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update challenge',
        });
      }
    }),

  // Delete challenge
  delete: publicProcedure
    .meta({ description: 'Permanently delete a challenge from the database by their ID.' })
    .input(deleteChallengeSchema)
    .output(challengeOutputSchema)
    .mutation(async ({ input }) => {
      try {
        const challenge = await Challenge.findByIdAndDelete(input.id);
        if (!challenge) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Challenge not found',
          });
        }
        return {
          _id: challenge._id.toString(),
          userId: challenge.userId,
          riskProfileId: challenge.riskProfileId,
          balance: challenge.balance,
          startDate: challenge.startDate,
          endDate: challenge.endDate,
          createdAt: challenge.createdAt,
          updatedAt: challenge.updatedAt,
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to delete challenge',
        });
      }
    }),
});