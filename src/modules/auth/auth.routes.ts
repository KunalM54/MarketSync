import { Router } from "express";
import {
  getMe,
  login,
  logout,
  register,
  sendPhoneOtpController,
  verifyPhoneOtpController,
  forgotPasswordController,
  verifyResetOtpController,
  resetPasswordController,
} from "./auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { registerSchema } from "./dto/register.dto.js";
import { loginSchema } from "./dto/login.dto.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { verifyPhoneOtpSchema, forgotPasswordSchema, verifyResetOtpSchema, resetPasswordSchema } from "./auth.validation.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", authenticate, getMe);
router.post("/logout", logout);
router.post("/send-phone-otp", authenticate, sendPhoneOtpController);
router.post("/verify-phone-otp",  authenticate, validate(verifyPhoneOtpSchema), verifyPhoneOtpController);
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPasswordController);
router.post("/verify-reset-otp", validate(verifyResetOtpSchema), verifyResetOtpController);
router.post("/reset-password", validate(resetPasswordSchema), resetPasswordController);

export default router;
