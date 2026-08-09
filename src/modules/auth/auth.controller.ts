import {
  loginUser,
  registerUser,
  getUserProfile,
  sendPhoneOtp,
  verifyPhoneOtp,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
} from "./auth.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { generateAccessToken } from "../../utils/jwt.js";
import { accessTokenCookieOptions } from "../../config/cookie.js";
import { sendResponse } from "../../utils/response.js";

export const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);

  return sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User created successfully",
    data: user,
  });
});

export const login = asyncHandler(async (req, res) => {
  const user = await loginUser(req.body);

  const accessToken = generateAccessToken({
    userId: user.id.toString(),
    role: user.role,
  });

  res.cookie("accessToken", accessToken, accessTokenCookieOptions);

  return sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User login successfully",
    data: user,
  });
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await getUserProfile(req.user.userId);

  return sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User fatched successfully",
    data: user,
  });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken", accessTokenCookieOptions);

  return sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logout successfully",
  });
});

export const sendPhoneOtpController = asyncHandler(async (req, res) => {
  console.log(req.user);
  console.log(req.user.userId);
  const result = await sendPhoneOtp(req.user.userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result.message,
    data: result.devOtp ? { devOtp: result.devOtp } : null,
  });
});

export const verifyPhoneOtpController = asyncHandler(async (req, res) => {
  const result = await verifyPhoneOtp(
    req.user.userId,
    req.body.otp
  );

  sendResponse(res, {
    statusCode : 200,
    success : true,
    message : result.message,
    data : null
  })

})

export const forgotPasswordController = asyncHandler(async (req, res) => {
  const result = await forgotPassword(req.body.identifier);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result.message,
    data:
      result.devToken || result.devOtp
        ? { devToken: result.devToken, devOtp: result.devOtp }
        : null,
  });
});

export const verifyResetOtpController = asyncHandler(async (req, res) => {
  const result = await verifyResetOtp(req.body.identifier, req.body.otp);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result.message,
    data: { resetToken: result.resetToken },
  });
});

export const resetPasswordController = asyncHandler(async (req, res) => {
  const { identifier, token, password } = req.body;
  const result = await resetPassword(identifier, token, password);

  res.clearCookie("accessToken", accessTokenCookieOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result.message,
    data: null,
  });
});
