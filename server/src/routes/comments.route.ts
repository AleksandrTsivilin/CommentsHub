'use strict';

import express from 'express';
import { commentsController } from '../controllers/comments.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { check } from 'express-validator';
import { captchaMiddleware } from '../middlewares/captcha.middleware';
import { ApiError } from '../exceptions/apiError';

export const commentsRouter = express.Router();

commentsRouter.post('/', 
    authMiddleware, 
    captchaMiddleware,
    check('text', 'text is required').notEmpty(),
    check('text').custom((value) => {
       
        const cleanedValue = value.replace(/<[^>]*>/g, ''); 
        if (/^\s*$/.test(cleanedValue)) {
          throw ApiError.badRequest('Text cannot be just whitespace');
        }
        return true;
    }),
    check('captcha', 'captcha is required').notEmpty(),
    check('homePage').if((value) => value).isURL().withMessage('url invalid'),
    commentsController.create
);
commentsRouter.get('/', commentsController.get);
commentsRouter.get('/:id', commentsController.getById);
