import { createTRPCRouter, publicProcedure } from '../trpc';
import {
  createSymbolSchema,
  updateSymbolSchema,
  getSymbolSchema,
  deleteSymbolSchema,
  symbolOutputSchema,
  symbolsListOutputSchema,
} from '../../schemas/symbol';
import Symbol from '../../collections/Symbol';
import { TRPCError } from '@trpc/server';

export const symbolRouter = createTRPCRouter({
  // Create a new symbol
  create: publicProcedure
    .meta({ description: 'Create a new trading symbol with name, symbol, and picture URL.' })
    .input(createSymbolSchema)
    .output(symbolOutputSchema)
    .mutation(async ({ input }) => {
      try {
        const symbol = new Symbol(input);
        const savedSymbol = await symbol.save();
        return {
          _id: savedSymbol._id.toString(),
          name: savedSymbol.name,
          symbol: savedSymbol.symbol,
          picture: savedSymbol.picture,
          createdAt: savedSymbol.createdAt,
          updatedAt: savedSymbol.updatedAt,
        };
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'Symbol with this symbol already exists',
          });
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create symbol',
        });
      }
    }),

  // Get all symbols
  getAll: publicProcedure
    .meta({ description: 'Retrieve all trading symbols from the database, sorted by creation date (newest first).' })
    .output(symbolsListOutputSchema)
    .query(async () => {
      try {
        const symbols = await Symbol.find().sort({ createdAt: -1 });
        return symbols.map(symbol => ({
          _id: symbol._id.toString(),
          name: symbol.name,
          symbol: symbol.symbol,
          picture: symbol.picture,
          createdAt: symbol.createdAt,
          updatedAt: symbol.updatedAt,
        }));
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch symbols',
        });
      }
    }),

  // Get symbol by ID
  getById: publicProcedure
    .meta({ description: 'Retrieve a specific symbol by their unique ID.' })
    .input(getSymbolSchema)
    .output(symbolOutputSchema)
    .query(async ({ input }) => {
      try {
        const symbol = await Symbol.findById(input.id);
        if (!symbol) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Symbol not found',
          });
        }
        return {
          _id: symbol._id.toString(),
          name: symbol.name,
          symbol: symbol.symbol,
          picture: symbol.picture,
          createdAt: symbol.createdAt,
          updatedAt: symbol.updatedAt,
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch symbol',
        });
      }
    }),

  // Update symbol
  update: publicProcedure
    .meta({ description: 'Update an existing symbol\'s information. All fields are optional except ID.' })
    .input(updateSymbolSchema)
    .output(symbolOutputSchema)
    .mutation(async ({ input }) => {
      try {
        const { id, ...updateData } = input;
        const symbol = await Symbol.findByIdAndUpdate(
          id,
          updateData,
          { new: true, runValidators: true }
        );
        if (!symbol) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Symbol not found',
          });
        }
        return {
          _id: symbol._id.toString(),
          name: symbol.name,
          symbol: symbol.symbol,
          picture: symbol.picture,
          createdAt: symbol.createdAt,
          updatedAt: symbol.updatedAt,
        };
      } catch (error: unknown) {
        if (error instanceof TRPCError) {
          throw error;
        }
        if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'Symbol with this symbol already exists',
          });
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update symbol',
        });
      }
    }),

  // Delete symbol
  delete: publicProcedure
    .meta({ description: 'Permanently delete a symbol from the database by their ID.' })
    .input(deleteSymbolSchema)
    .output(symbolOutputSchema)
    .mutation(async ({ input }) => {
      try {
        const symbol = await Symbol.findByIdAndDelete(input.id);
        if (!symbol) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Symbol not found',
          });
        }
        return {
          _id: symbol._id.toString(),
          name: symbol.name,
          symbol: symbol.symbol,
          picture: symbol.picture,
          createdAt: symbol.createdAt,
          updatedAt: symbol.updatedAt,
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to delete symbol',
        });
      }
    }),
});