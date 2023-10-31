'use strict';

import express from 'express';
import { captchaController } from '../controllers/captcha.controller';

export const captchaRouter = express.Router();

captchaRouter.get('/',  captchaController.get);