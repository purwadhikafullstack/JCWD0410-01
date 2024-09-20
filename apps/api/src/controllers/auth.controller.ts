// import { forgotPasswordService } from '@/services/auth/forgot-password.service';
// import { loginService } from '@/services/auth/login.service';
import { completeRegistrationService } from '@/services/auth/complete-register.service';
import { getEmailFromTokenService } from '@/services/auth/get-email-from-token.service';
import { loginWithGoogleService } from '@/services/auth/google.service';
import { loginService } from '@/services/auth/login.service';
import { registerService } from '@/services/auth/register.service';
// import { resetPasswordService } from '@/services/auth/reset-password.service';
import { NextFunction, Request, Response } from 'express';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await registerService(req.body);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getEmailFromToken(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getEmailFromTokenService(
        String(res.locals.user.email),
      );
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async completeRegistration(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await completeRegistrationService(
        res.locals.user.email,
        req.body,
        String(req.headers.authorization?.split(' ')[1]),
      );

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await loginService(req.body);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async loginWithGoogleController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { accessToken } = req.body;
      const result = await loginWithGoogleService(accessToken);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  // async forgotPassword(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const result = await forgotPasswordService(req.body.email);
  //     return res.status(200).send(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async resetPassword(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const result = await resetPasswordService(
  //       //isi token ditaruh di res local
  //       Number(res.locals.user.id),
  //       req.body.password,
  //     );
  //     return res.status(200).send(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
