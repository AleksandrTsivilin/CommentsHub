
import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../exceptions/apiError';
export type Controller = (req: Request, res: Response, next: NextFunction) => void;

export type ErrorHandlerMiddleware = (
    err: Error | ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => Response
  
export interface RequestWithUserData extends Request {
    userId?: number
}
