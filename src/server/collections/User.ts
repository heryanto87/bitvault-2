import mongoose, { Schema } from 'mongoose';
import { z } from 'zod';

// Zod schema for User validation
export const UserZodSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name cannot be more than 100 characters').trim(),
  email: z.string().email('Please enter a valid email').toLowerCase().trim(),
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Wallet address must be a valid Ethereum address'),
  role: z.enum(['trader', 'investor'], { required_error: 'Role must be either trader or investor' }),
  profilePicture: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Infer TypeScript type from Zod schema
export type IUser = z.infer<typeof UserZodSchema>;

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    walletAddress: {
      type: String,
      required: [true, 'Wallet address is required'],
      unique: true,
      match: [/^0x[a-fA-F0-9]{40}$/, 'Wallet address must be a valid Ethereum address'],
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: {
        values: ['trader', 'investor'],
        message: 'Role must be either trader or investor'
      }
    },
    profilePicture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation during development
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;