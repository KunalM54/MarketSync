import z from "zod";
import { PHONE_REGEX } from "../user/user.validation.js";

export const verifyPhoneOtpSchema = z.object({
  otp: z.string().trim().length(6, "Otp must be exactly 6 digits"),
});

export const verifyResetOtpSchema = z.object({
  identifier: z
    .string()
    .trim()
    .refine(
      (value) => {
        const isEmail = z.string().email().safeParse(value).success;
        const isPhone = PHONE_REGEX.test(value);

        return isEmail || isPhone;
      },
      {
        message: "Identifier must be a valid email or phone number",
      },
    ),
  otp: z.string().trim().length(6, "Otp must be exactly 6 digits"),
});

export const forgotPasswordSchema = z.object({
  identifier: z
    .string()
    .trim()
    .refine(
      (value) => {
        const isEmail = z.string().email().safeParse(value).success;
        const isPhone = PHONE_REGEX.test(value);

        return isEmail || isPhone;
      },
      {
        message: "Identifier must be a valid email or phone number",
      },
    ),
});

export const resetPasswordSchema = z
  .object({
    identifier: z
      .string()
      .trim()
      .refine(
        (value) => {
          const isEmail = z.string().email().safeParse(value).success;
          const isPhone = PHONE_REGEX.test(value);
          return isEmail || isPhone;
        },
        { message: "Identifier must be a valid email or phone number" },
      ),
    token: z.string().trim().min(1, "Token/OTP is required"),
    password: z
      .string()
      .min(4, "Password must be at least 4 characters")
      .max(10, "Password cannot exceed 10 characters"),
    confirmPassword: z
      .string()
      .min(4, "Confirm password must be at least 4 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

