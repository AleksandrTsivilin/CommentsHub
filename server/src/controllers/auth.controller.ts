'use strict';
import { ApiError } from "../exceptions/apiError";
import { Controller } from "../types/Controller";
import { authService } from '../services/auth.service';
import { validationResult } from 'express-validator/src/validation-result.js';


class AuthController {
    private static instance: AuthController | null = null;

    // eslint-disable-next-line no-empty-function
    private constructor() {}

    static getInstance() {
      if (!AuthController.instance) {
          AuthController.instance = new AuthController();
      }

      return AuthController.instance;
    }

    register: Controller = async (req, res, next) => {
        const {captcha, ...userData } = req.body;
        const errors = validationResult(req); 
        
        try {
          if (!errors.isEmpty()) {
            const errorsInfo = errors.array().map(err => err.msg).join('; ');
            throw ApiError.badRequest(`Data invalid: ${errorsInfo}`);
          }
          const token = await authService.register({...userData});

          return res.status(201).send({ token });        
        } catch (e: any) {
            next(e);
        }
      

    }
    
    login: Controller = async (req, res, next) => {
      const {captcha, ...userData } = req.body;
      
      try {
        const errors = validationResult(req); 
        if (!errors.isEmpty()) {
          const errorsInfo = errors.array().map(err => err.msg).join('; ');
          throw ApiError.badRequest(`Data invalid: ${errorsInfo}`);
        }

        const token = await authService.login({...userData});

        return res.status(200).send({ token });        
      } catch (e: any) {
          next(e);
      }
    }
}

export const authController = AuthController.getInstance();