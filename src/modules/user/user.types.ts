import z from "zod";
import { UserRole } from "./user.model.js";
import { updateSelfSchema, updateUserSchema } from "./user.validation.js";

export type UserResponse = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  isPhoneVerified: boolean;
  role: UserRole;
  isActive: boolean;
};

export type UpdateUserBody = z.infer<typeof updateUserSchema>;

export type UpdateSelfBody = z.infer<typeof updateSelfSchema>;
