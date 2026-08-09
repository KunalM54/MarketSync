import { Schema, model } from "mongoose";

export enum UserRole {
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
  SELLER = "SELLER",
}

export interface IUser {
  name: string;
  email?: string;
  password: string;
  phone: string;
  isPhoneVerified: boolean;
  role: UserRole;
  isActive: boolean;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      sparse: true,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.CUSTOMER,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<IUser>("User", userSchema);
