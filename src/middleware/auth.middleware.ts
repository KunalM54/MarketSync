import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt.js";
import { AppError } from "../utils/AppError.js";
import { User } from "../modules/user/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const authenticate = asyncHandler(
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const token = req.cookies.accessToken;

        if (!token) {
            throw new AppError(401, "Unauthorized");
        }

        let payload;
        try {
            payload = verifyAccessToken(token);
        } catch {
            throw new AppError(401, "Unauthorized");
        }

        // The role can change after the JWT is issued (e.g. a CUSTOMER
        // promoted to ADMIN). Always read the current role from the database
        // so authorization uses fresh data instead of the stale JWT claim.
        const user = await User.findById(payload.userId).select("role isActive");

        if (!user) {
            throw new AppError(401, "Unauthorized");
        }

        if (!user.isActive) {
            throw new AppError(403, "Your account has been deactivated");
        }

        req.user = {
            userId: payload.userId,
            role: user.role,
        };

        next();
    }
);