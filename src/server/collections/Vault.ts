import mongoose, { Schema } from 'mongoose';
import { z } from 'zod';

// Zod schema for Vault validation
export const VaultZodSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  name: z.string().min(1, 'Name is required').max(100, 'Name cannot be more than 100 characters').trim(),
  picture: z.string().min(1, 'Picture is required'),
  balance: z.number().min(0, 'Balance cannot be negative'),
  profitShareRatio: z.number().int().min(1, 'Profit share ratio must be at least 1%').max(99, 'Profit share ratio cannot exceed 99%'),
  payoutCycle: z.number().int().min(1, 'Payout cycle must be at least 1 month').max(12, 'Payout cycle cannot exceed 12 months'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Infer TypeScript type from Zod schema
export type IVault = z.infer<typeof VaultZodSchema>;

const VaultSchema: Schema<IVault> = new Schema<IVault>(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    picture: {
      type: String,
      required: [true, 'Picture is required'],
    },
    balance: {
      type: Number,
      required: [true, 'Balance is required'],
      min: [0, 'Balance cannot be negative'],
      default: 0,
    },
    profitShareRatio: {
      type: Number,
      required: [true, 'Profit share ratio is required'],
      min: [1, 'Profit share ratio must be at least 1%'],
      max: [99, 'Profit share ratio cannot exceed 99%'],
    },
    payoutCycle: {
      type: Number,
      required: [true, 'Payout cycle is required'],
      min: [1, 'Payout cycle must be at least 1 month'],
      max: [12, 'Payout cycle cannot exceed 12 months'],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation during development
const Vault = mongoose.models.Vault || mongoose.model<IVault>('Vault', VaultSchema);

export default Vault;