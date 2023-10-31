'use strict';
import { check } from 'express-validator';

import express from 'express';
import { authController } from '../controllers/auth.controller';
import { captchaMiddleware } from '../middlewares/captcha.middleware';
import { ApiError } from '../exceptions/apiError';

export const authRouter = express.Router();

authRouter.post(
    '/register',
    captchaMiddleware,
    check('email', 'email is required').notEmpty(),
    check('email', 'email is too long').isLength({max: 50}),
    check('email', 'email is not email').isEmail(),
    check('password', 'length password less 3').isLength({min: 3}),
    check('password', 'password is required').notEmpty(),
    check('password').custom((value) => {
        if (/^\s*$/.test(value)) {
          throw ApiError.badRequest('Password cannot be just whitespace');
        }
        return true;
    }),
    check('userName', 'userName is required').notEmpty(),
    check('userName').custom((value) => {
        if (/^\s*$/.test(value)) {
          throw ApiError.badRequest('User name cannot be just whitespace');
        }
        return true;
    }),
    check('captcha', 'captcha is required').notEmpty(),
    authController.register
);

authRouter.post(
    '/login',
    captchaMiddleware,
    check('email', 'email is required').notEmpty(),
    check('password', 'password is required').notEmpty(),
    check('captcha', 'captcha is required').notEmpty(),
    authController.login
);