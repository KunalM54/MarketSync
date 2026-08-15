import { z } from "zod";
import { UserRole } from "../user.model.js";
import { PHONE_REGEX } from "../user.validation.js";

export const createUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name cannot exceed 50 characters"),

  password: z
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(10, "Password cannot exceed 10 characters"),

  role: z.nativeEnum(UserRole),

  phone: z
    .string()
    .trim()
    .regex(
      PHONE_REGEX,
      "Invalid phone number. Use E.164 format (e.g. +919876543210).",
    ),
});

export type createUserDto = z.infer<typeof createUserSchema>;
