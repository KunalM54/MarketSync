import type { CookieOptions } from "express";
import { env } from "./env.js";

const isProduction = env.NODE_ENV === "production";

export const accessTokenCookieOptions: CookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000
}
