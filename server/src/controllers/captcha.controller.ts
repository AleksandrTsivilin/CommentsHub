'use strict';
import { Controller } from "../types/Controller";
import svgCaptcha from 'svg-captcha';


class CaptchaController {
  private static instance: CaptchaController | null = null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance() {
    if (!CaptchaController.instance) {
        CaptchaController.instance = new CaptchaController();
    }

    return CaptchaController.instance;
  }

    get: Controller = async (req, res) => {
        const maxAge = 1000 * 60 * 60;
        const captcha = svgCaptcha.create({ size: 4 });
        res.cookie('captcha', captcha.text, {maxAge, httpOnly: true, secure: true, sameSite: 'none'});
        res.type('svg');
        res.status(200).send(captcha.data);
    };
}

export const captchaController = CaptchaController.getInstance();
