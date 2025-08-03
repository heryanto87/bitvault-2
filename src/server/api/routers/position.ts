import { createTRPCRouter, publicProcedure } from '../trpc';
import {
  createPositionSchema,
  updatePositionSchema,
  getPositionSchema,
  deletePositionSchema,
  getPositionsByUserSchema,
  getPositionsBySymbolSchema,
  closePositionSchema,
  positionOutputSchema,
  positionsListOutputSchema,
} from '../../schemas/position';
import Position from '../../collections/Position';
import User from '../../collections/User';
import Symbol from '../../collections/Symbol';
import { TRPCError } from '@trpc/server';

export const positionRouter = createTRPCRouter({
  // Create a new position
  create: publicProcedure
    .meta({ description: 'Create a new trading position for a user in a specific symbol.' })
    .input(createPositionSchema)
    .output(positionOutputSchema)
    .mutation(async ({ input }) => {
      try {
        // Verify user exists
        const user = await User.findById(input.userId);
        if (!user) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User not found',
          });
        }

        // Verify symbol exists
        const symbol = await Symbol.findById(input.symbolId);
        if (!symbol) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Symbol not found',
          });
        }

        const position = new Position(input);
        const savedPosition = await position.save();
        return {
          _id: savedPosition._id.toString(),
          userId: savedPosition.userId,
          symbolId: savedPosition.symbolId,
          totalQuantity: savedPosition.totalQuantity,
          averageBuyPrice: savedPosition.averageBuyPrice,
          realizedPnL: savedPosition.realizedPnL,
          closedAt: savedPosition.closedAt,
          createdAt: savedPosition.createdAt,
          updatedAt: savedPosition.updatedAt,
        };
      } catch (error: unknown) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create position',
        });
      }
    }),

  // Get all positions
  getAll: publicProcedure
    .meta({ description: 'Retrieve all positions from the database, sorted by creation date (newest first).' })
    .output(positionsListOutputSchema)
    .query(async () => {
      try {
        const positions = await Position.find().sort({ createdAt: -1 });
        return positions.map(position => ({
          _id: position._id.toString(),
          userId: position.userId,
          symbolId: position.symbolId,
          totalQuantity: position.totalQuantity,
          averageBuyPrice: position.averageBuyPrice,
          realizedPnL: position.realizedPnL,
          closedAt: position.closedAt,
          createdAt: position.createdAt,
          updatedAt: position.updatedAt,
        }));
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch positions',
        });
      }
    }),

  // Get position by ID
  getById: publicProcedure
    .meta({ description: 'Retrieve a specific position by their unique ID.' })
    .input(getPositionSchema)
    .output(positionOutputSchema)
    .query(async ({ input }) => {
      try {
        const position = await Position.findById(input.id);
        if (!position) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Position not found',
          });
        }
        return {
          _id: position._id.toString(),
          userId: position.userId,
          symbolId: position.symbolId,
          totalQuantity: position.totalQuantity,
          averageBuyPrice: position.averageBuyPrice,
          realizedPnL: position.realizedPnL,
          closedAt: position.closedAt,
          createdAt: position.createdAt,
          updatedAt: position.updatedAt,
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch position',
        });
      }
    }),

  // Get positions by user ID
  getByUserId: publicProcedure
    .meta({ description: 'Retrieve all positions owned by a specific user.' })
    .input(getPositionsByUserSchema)
    .output(positionsListOutputSchema)
    .query(async ({ input }) => {
      try {
        const positions = await Position.find({ userId: input.userId }).sort({ createdAt: -1 });
        return positions.map(position => ({
          _id: position._id.toString(),
          userId: position.userId,
          symbolId: position.symbolId,
          totalQuantity: position.totalQuantity,
          averageBuyPrice: position.averageBuyPrice,
          realizedPnL: position.realizedPnL,
          closedAt: position.closedAt,
          createdAt: position.createdAt,
          updatedAt: position.updatedAt,
        }));
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch user positions',
        });
      }
    }),

  // Get positions by symbol ID
  getBySymbolId: publicProcedure
    .meta({ description: 'Retrieve all positions for a specific symbol.' })
    .input(getPositionsBySymbolSchema)
    .output(positionsListOutputSchema)
    .query(async ({ input }) => {
      try {
        const positions = await Position.find({ symbolId: input.symbolId }).sort({ createdAt: -1 });
        return positions.map(position => ({
          _id: position._id.toString(),
          userId: position.userId,
          symbolId: position.symbolId,
          totalQuantity: position.totalQuantity,
          averageBuyPrice: position.averageBuyPrice,
          realizedPnL: position.realizedPnL,
          closedAt: position.closedAt,
          createdAt: position.createdAt,
          updatedAt: position.updatedAt,
        }));
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch symbol positions',
        });
      }
    }),

  // Close position
  close: publicProcedure
    .meta({ description: 'Close a position by setting closedAt timestamp.' })
    .input(closePositionSchema)
    .output(positionOutputSchema)
    .mutation(async ({ input }) => {
      try {
        const position = await Position.findByIdAndUpdate(
          input.id,
          { closedAt: new Date() },
          { new: true, runValidators: true }
        );
        if (!position) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Position not found',
          });
        }
        return {
          _id: position._id.toString(),
          userId: position.userId,
          symbolId: position.symbolId,
          totalQuantity: position.totalQuantity,
          averageBuyPrice: position.averageBuyPrice,
          realizedPnL: position.realizedPnL,
          closedAt: position.closedAt,
          createdAt: position.createdAt,
          updatedAt: position.updatedAt,
        };
      } catch (error: unknown) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to close position',
        });
      }
    }),

  // Update position
  update: publicProcedure
    .meta({ description: 'Update an existing position\'s information. All fields are optional except ID.' })
    .input(updatePositionSchema)
    .output(positionOutputSchema)
    .mutation(async ({ input }) => {
      try {
        const { id, ...updateData } = input;
        const position = await Position.findByIdAndUpdate(
          id,
          updateData,
          { new: true, runValidators: true }
        );
        if (!position) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Position not found',
          });
        }
        return {
          _id: position._id.toString(),
          userId: position.userId,
          symbolId: position.symbolId,
          totalQuantity: position.totalQuantity,
          averageBuyPrice: position.averageBuyPrice,
          realizedPnL: position.realizedPnL,
          closedAt: position.closedAt,
          createdAt: position.createdAt,
          updatedAt: position.updatedAt,
        };
      } catch (error: unknown) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update position',
        });
      }
    }),

  // Delete position
  delete: publicProcedure
    .meta({ description: 'Permanently delete a position from the database by their ID.' })
    .input(deletePositionSchema)
    .output(positionOutputSchema)
    .mutation(async ({ input }) => {
      try {
        const position = await Position.findByIdAndDelete(input.id);
        if (!position) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Position not found',
          });
        }
        return {
          _id: position._id.toString(),
          userId: position.userId,
          symbolId: position.symbolId,
          totalQuantity: position.totalQuantity,
          averageBuyPrice: position.averageBuyPrice,
          realizedPnL: position.realizedPnL,
          closedAt: position.closedAt,
          createdAt: position.createdAt,
          updatedAt: position.updatedAt,
        };
      } catch (error: unknown) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to delete position',
        });
      }
    }),
});