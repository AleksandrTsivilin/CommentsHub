import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exceptions/apiError";


export const captchaMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const {captcha} = req.body;
        const captchaCookie = req.cookies?.captcha;
        if (captcha !== captchaCookie) {
            return next(ApiError.badRequest('Invalid captcha'));
        }

        next();
        
    } catch (e) {
        return next(ApiError.badRequest('invalid captcha'));
    }
} 