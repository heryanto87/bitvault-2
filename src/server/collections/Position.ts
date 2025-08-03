import mongoose, { Schema } from 'mongoose';
import { z } from 'zod';

// Zod schema for Position validation
export const PositionZodSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  symbolId: z.string().min(1, 'Symbol ID is required'),
  totalQuantity: z.number().min(0, 'Total quantity cannot be negative'),
  averageBuyPrice: z.number().min(0, 'Average buy price cannot be negative'),
  realizedPnL: z.number().default(0),
  closedAt: z.date().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Infer TypeScript type from Zod schema
export type IPosition = z.infer<typeof PositionZodSchema>;

const PositionSchema: Schema<IPosition> = new Schema<IPosition>(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      ref: 'User',
    },
    symbolId: {
      type: String,
      required: [true, 'Symbol ID is required'],
      ref: 'Symbol',
    },
    totalQuantity: {
      type: Number,
      required: [true, 'Total quantity is required'],
      min: [0, 'Total quantity cannot be negative'],
    },
    averageBuyPrice: {
      type: Number,
      required: [true, 'Average buy price is required'],
      min: [0, 'Average buy price cannot be negative'],
    },
    realizedPnL: {
      type: Number,
      required: [true, 'Realized PnL is required'],
      default: 0,
    },
    closedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation during development
const Position = mongoose.models.Position || mongoose.model<IPosition>('Position', PositionSchema);

export default Position;