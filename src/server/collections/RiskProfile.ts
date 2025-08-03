import mongoose, { Schema } from 'mongoose';
import { z } from 'zod';

// Zod schema for RiskProfile validation
export const RiskProfileZodSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name cannot be more than 100 characters').trim(),
  description: z.string().min(1, 'Description is required').max(500, 'Description cannot be more than 500 characters').trim(),
  image: z.string().min(1, 'Image is required'),
  maxDrawdown: z.number().min(0, 'Max drawdown cannot be negative').max(100, 'Max drawdown cannot exceed 100%'),
  challengeProfitTarget: z.number().min(0, 'Challenge profit target cannot be negative'),
  challengeTimeBox: z.number().int().min(1, 'Challenge time box must be at least 1 day').max(365, 'Challenge time box cannot exceed 365 days'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Infer TypeScript type from Zod schema
export type IRiskProfile = z.infer<typeof RiskProfileZodSchema>;

const RiskProfileSchema: Schema<IRiskProfile> = new Schema<IRiskProfile>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    maxDrawdown: {
      type: Number,
      required: [true, 'Max drawdown is required'],
      min: [0, 'Max drawdown cannot be negative'],
      max: [100, 'Max drawdown cannot exceed 100%'],
    },
    challengeProfitTarget: {
      type: Number,
      required: [true, 'Challenge profit target is required'],
      min: [0, 'Challenge profit target cannot be negative'],
    },
    challengeTimeBox: {
      type: Number,
      required: [true, 'Challenge time box is required'],
      min: [1, 'Challenge time box must be at least 1 day'],
      max: [365, 'Challenge time box cannot exceed 365 days'],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation during development
const RiskProfile = mongoose.models.RiskProfile || mongoose.model<IRiskProfile>('RiskProfile', RiskProfileSchema);

export default RiskProfile;