import mongoose, { Schema } from 'mongoose';
import { z } from 'zod';

// Zod schema for Trade validation
export const TradeZodSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  positionId: z.string().min(1, 'Position ID is required'),
  symbolId: z.string().min(1, 'Symbol ID is required'),
  type: z.enum(['buy', 'sell'], { required_error: 'Type must be either buy or sell' }),
  quantity: z.number().positive('Quantity must be positive'),
  price: z.number().positive('Price must be positive'),
  fee: z.number().min(0, 'Fee cannot be negative').default(0),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Infer TypeScript type from Zod schema
export type ITrade = z.infer<typeof TradeZodSchema>;

const TradeSchema: Schema<ITrade> = new Schema<ITrade>(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      ref: 'User',
    },
    positionId: {
      type: String,
      required: [true, 'Position ID is required'],
      ref: 'Position',
    },
    symbolId: {
      type: String,
      required: [true, 'Symbol ID is required'],
      ref: 'Symbol',
    },
    type: {
      type: String,
      required: [true, 'Type is required'],
      enum: {
        values: ['buy', 'sell'],
        message: 'Type must be either buy or sell'
      }
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0.000001, 'Quantity must be positive'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0.000001, 'Price must be positive'],
    },
    fee: {
      type: Number,
      required: [true, 'Fee is required'],
      min: [0, 'Fee cannot be negative'],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation during development
const Trade = mongoose.models.Trade || mongoose.model<ITrade>('Trade', TradeSchema);

export default Trade;