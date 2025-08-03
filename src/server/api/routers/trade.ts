import { createTRPCRouter, publicProcedure } from '../trpc';
import {
  createTradeSchema,
  updateTradeSchema,
  getTradeSchema,
  deleteTradeSchema,
  getTradesByUserSchema,
  getTradesByPositionSchema,
  getTradesBySymbolSchema,
  tradeOutputSchema,
  tradesListOutputSchema,
} from '../../schemas/trade';
import Trade from '../../collections/Trade';
import User from '../../collections/User';
import Position from '../../collections/Position';
import Symbol from '../../collections/Symbol';
import { TRPCError } from '@trpc/server';

export const tradeRouter = createTRPCRouter({
  // Create a new trade
  create: publicProcedure
    .meta({ description: 'Create a new trade execution record.' })
    .input(createTradeSchema)
    .output(tradeOutputSchema)
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

        // Verify position exists
        const position = await Position.findById(input.positionId);
        if (!position) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Position not found',
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

        // Verify position belongs to user
        if (position.userId !== input.userId) {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Position does not belong to this user',
          });
        }

        // Verify symbol matches position
        if (position.symbolId !== input.symbolId) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Symbol does not match position symbol',
          });
        }

        const trade = new Trade(input);
        const savedTrade = await trade.save();
        return {
          _id: savedTrade._id.toString(),
          userId: savedTrade.userId,
          positionId: savedTrade.positionId,
          symbolId: savedTrade.symbolId,
          type: savedTrade.type,
          quantity: savedTrade.quantity,
          price: savedTrade.price,
          fee: savedTrade.fee,
          createdAt: savedTrade.createdAt,
          updatedAt: savedTrade.updatedAt,
        };
      } catch (error: unknown) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create trade',
        });
      }
    }),

  // Get all trades
  getAll: publicProcedure
    .meta({ description: 'Retrieve all trades from the database, sorted by creation date (newest first).' })
    .output(tradesListOutputSchema)
    .query(async () => {
      try {
        const trades = await Trade.find().sort({ createdAt: -1 });
        return trades.map(trade => ({
          _id: trade._id.toString(),
          userId: trade.userId,
          positionId: trade.positionId,
          symbolId: trade.symbolId,
          type: trade.type,
          quantity: trade.quantity,
          price: trade.price,
          fee: trade.fee,
          createdAt: trade.createdAt,
          updatedAt: trade.updatedAt,
        }));
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch trades',
        });
      }
    }),

  // Get trade by ID
  getById: publicProcedure
    .meta({ description: 'Retrieve a specific trade by their unique ID.' })
    .input(getTradeSchema)
    .output(tradeOutputSchema)
    .query(async ({ input }) => {
      try {
        const trade = await Trade.findById(input.id);
        if (!trade) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Trade not found',
          });
        }
        return {
          _id: trade._id.toString(),
          userId: trade.userId,
          positionId: trade.positionId,
          symbolId: trade.symbolId,
          type: trade.type,
          quantity: trade.quantity,
          price: trade.price,
          fee: trade.fee,
          createdAt: trade.createdAt,
          updatedAt: trade.updatedAt,
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch trade',
        });
      }
    }),

  // Get trades by user ID
  getByUserId: publicProcedure
    .meta({ description: 'Retrieve all trades executed by a specific user.' })
    .input(getTradesByUserSchema)
    .output(tradesListOutputSchema)
    .query(async ({ input }) => {
      try {
        const trades = await Trade.find({ userId: input.userId }).sort({ createdAt: -1 });
        return trades.map(trade => ({
          _id: trade._id.toString(),
          userId: trade.userId,
          positionId: trade.positionId,
          symbolId: trade.symbolId,
          type: trade.type,
          quantity: trade.quantity,
          price: trade.price,
          fee: trade.fee,
          createdAt: trade.createdAt,
          updatedAt: trade.updatedAt,
        }));
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch user trades',
        });
      }
    }),

  // Get trades by position ID
  getByPositionId: publicProcedure
    .meta({ description: 'Retrieve all trades for a specific position.' })
    .input(getTradesByPositionSchema)
    .output(tradesListOutputSchema)
    .query(async ({ input }) => {
      try {
        const trades = await Trade.find({ positionId: input.positionId }).sort({ createdAt: -1 });
        return trades.map(trade => ({
          _id: trade._id.toString(),
          userId: trade.userId,
          positionId: trade.positionId,
          symbolId: trade.symbolId,
          type: trade.type,
          quantity: trade.quantity,
          price: trade.price,
          fee: trade.fee,
          createdAt: trade.createdAt,
          updatedAt: trade.updatedAt,
        }));
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch position trades',
        });
      }
    }),

  // Get trades by symbol ID
  getBySymbolId: publicProcedure
    .meta({ description: 'Retrieve all trades for a specific symbol.' })
    .input(getTradesBySymbolSchema)
    .output(tradesListOutputSchema)
    .query(async ({ input }) => {
      try {
        const trades = await Trade.find({ symbolId: input.symbolId }).sort({ createdAt: -1 });
        return trades.map(trade => ({
          _id: trade._id.toString(),
          userId: trade.userId,
          positionId: trade.positionId,
          symbolId: trade.symbolId,
          type: trade.type,
          quantity: trade.quantity,
          price: trade.price,
          fee: trade.fee,
          createdAt: trade.createdAt,
          updatedAt: trade.updatedAt,
        }));
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch symbol trades',
        });
      }
    }),

  // Update trade
  update: publicProcedure
    .meta({ description: 'Update an existing trade\'s information. All fields are optional except ID.' })
    .input(updateTradeSchema)
    .output(tradeOutputSchema)
    .mutation(async ({ input }) => {
      try {
        const { id, ...updateData } = input;
        const trade = await Trade.findByIdAndUpdate(
          id,
          updateData,
          { new: true, runValidators: true }
        );
        if (!trade) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Trade not found',
          });
        }
        return {
          _id: trade._id.toString(),
          userId: trade.userId,
          positionId: trade.positionId,
          symbolId: trade.symbolId,
          type: trade.type,
          quantity: trade.quantity,
          price: trade.price,
          fee: trade.fee,
          createdAt: trade.createdAt,
          updatedAt: trade.updatedAt,
        };
      } catch (error: unknown) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update trade',
        });
      }
    }),

  // Delete trade
  delete: publicProcedure
    .meta({ description: 'Permanently delete a trade from the database by their ID.' })
    .input(deleteTradeSchema)
    .output(tradeOutputSchema)
    .mutation(async ({ input }) => {
      try {
        const trade = await Trade.findByIdAndDelete(input.id);
        if (!trade) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Trade not found',
          });
        }
        return {
          _id: trade._id.toString(),
          userId: trade.userId,
          positionId: trade.positionId,
          symbolId: trade.symbolId,
          type: trade.type,
          quantity: trade.quantity,
          price: trade.price,
          fee: trade.fee,
          createdAt: trade.createdAt,
          updatedAt: trade.updatedAt,
        };
      } catch (error: unknown) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to delete trade',
        });
      }
    }),
});