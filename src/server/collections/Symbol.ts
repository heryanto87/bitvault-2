import mongoose, { Schema } from 'mongoose';
import { z } from 'zod';

// Zod schema for Symbol validation
export const SymbolZodSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name cannot be more than 100 characters').trim(),
  symbol: z.string().min(1, 'Symbol is required').max(20, 'Symbol cannot be more than 20 characters').trim().toUpperCase(),
  picture: z.string().url('Picture must be a valid URL'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Infer TypeScript type from Zod schema
export type ISymbol = z.infer<typeof SymbolZodSchema>;

const SymbolSchema: Schema<ISymbol> = new Schema<ISymbol>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    symbol: {
      type: String,
      required: [true, 'Symbol is required'],
      unique: true,
      uppercase: true,
      trim: true,
      maxlength: [20, 'Symbol cannot be more than 20 characters'],
    },
    picture: {
      type: String,
      required: [true, 'Picture URL is required'],
      validate: {
        validator: function(v: string) {
          return /^https?:\/\/.+/.test(v);
        },
        message: 'Picture must be a valid URL'
      }
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation during development
const Symbol = mongoose.models.Symbol || mongoose.model<ISymbol>('Symbol', SymbolSchema);

export default Symbol;