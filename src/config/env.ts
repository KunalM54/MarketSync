import dotenv from 'dotenv';
import type { SignOptions } from 'jsonwebtoken';

dotenv.config();

export const env = {
    NODE_ENV : process.env.NODE_ENV!,
    PORT : Number(process.env.PORT) || 3000,
    CLIENT_ORIGIN : process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
    MONGO_URI : process.env.MONGO_URI!,
    JWT_ACCESS_SECRET : process.env.JWT_ACCESS_SECRET!,
    JWT_ACCESS_EXPIRES_IN : process.env.JWT_ACCESS_EXPIRES_IN! as NonNullable<SignOptions["expiresIn"]>,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID!,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET!,
    RAZORPAY_WEBHOOK_SECRET: process.env.RAZORPAY_WEBHOOK_SECRET!,
    IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY!,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY!,
    IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT!,
}