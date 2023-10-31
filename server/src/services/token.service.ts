import { ApiError } from "../exceptions/apiError";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { errorHandler } from "../exceptions/errorHandler";

dotenv.config();



export const  generateToken = ( {...userData} ) => {
    const tokenSecret = process.env.TOKEN_SECRET_KEY;

    if (!tokenSecret) {
        throw ApiError.internal();
    }

    return jwt.sign({ ...userData }, tokenSecret, { expiresIn: '24h', algorithm: 'HS256' });
}

export const  validateToken = (token: string) => {
    try {
      const secretKey = process.env.TOKEN_SECRET_KEY; 
      if (!secretKey) {
        throw ApiError.internal();
      }

      const userData = jwt.verify(token, secretKey, { algorithms: ['HS256'] });

      return userData;

    } catch (error: any) {
        errorHandler(error)
    }
  }