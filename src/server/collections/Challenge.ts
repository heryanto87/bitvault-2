import mongoose, { Schema } from 'mongoose';
import { z } from 'zod';

// Zod schema for Challenge validation
export const ChallengeZodSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  riskProfileId: z.string().min(1, 'Risk Profile ID is required'),
  balance: z.number().min(0, 'Balance cannot be negative').default(10000),
  startDate: z.date(),
  endDate: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Infer TypeScript type from Zod schema
export type IChallenge = z.infer<typeof ChallengeZodSchema>;

const ChallengeSchema: Schema<IChallenge> = new Schema<IChallenge>(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      ref: 'User',
    },
    riskProfileId: {
      type: String,
      required: [true, 'Risk Profile ID is required'],
      ref: 'RiskProfile',
    },
    balance: {
      type: Number,
      required: [true, 'Balance is required'],
      min: [0, 'Balance cannot be negative'],
      default: 10000,
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation during development
const Challenge = mongoose.models.Challenge || mongoose.model<IChallenge>('Challenge', ChallengeSchema);

export default Challenge;