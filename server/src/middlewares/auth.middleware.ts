import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exceptions/apiError";
import { validateToken } from "../services/token.service";
import { RequestWithUserData } from "../types/Controller";

interface UserData {
    id: number,
    email: string,
    userName: string
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(ApiError.unauthorize());
        }

        const [, token] = authHeader.split(' ');

        if (!token) {
            return next(ApiError.unauthorize());
        }

        const userData = validateToken(token) as UserData;
        
        if (!userData) {
            return next(ApiError.unauthorize())
        }
        const reqWithUserData: RequestWithUserData = req;
        reqWithUserData.userId  = userData.id;
        next();

      
    } catch (e) {
        return next(ApiError.unauthorize());
    }
} 