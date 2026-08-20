import type { Request, Response } from "express";

export const getHealth =  (req:Request, res:Response) => {
    res.status(200).json({
        success : true,
        message: "MarketSync Backend is running",
    });
};