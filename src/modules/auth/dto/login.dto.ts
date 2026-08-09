import { z } from "zod";
import { PHONE_REGEX } from "../../user/user.validation.js";

export const loginSchema = z.object({
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
        message: "Identifier must be a valid phone number or email",
      },
    ),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export type LoginDto = z.infer<typeof loginSchema>;