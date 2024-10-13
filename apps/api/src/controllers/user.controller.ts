import { getUserService } from '@/services/user/get-user.service';
import { updateEmailService } from '@/services/user/update-email.service';
import { updatePasswordService } from '@/services/user/update-password.service';
import { updateProfileService } from '@/services/user/update-user.service';
import { verifyEmailService } from '@/services/user/verify-email.service';

import { NextFunction, Request, Response } from 'express';

export class UserController {
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getUserService(Number(res.locals.user.id));
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateProfileController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await updateProfileService(
        Number(res.locals.user.id),
        req.body,
        req.file!,
      );
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateEmailController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await updateEmailService(
        Number(res.locals.user.id),
        req.body.email,
      );
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async VerifyEmailController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await verifyEmailService(
        Number(res.locals.user.id),
        res.locals.user.email,
      );
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updatePasswordController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await updatePasswordService(
        Number(res.locals.user.id),
        req.body.password,
        req.body.oldPassword,
      );
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await updateProfileService(
        Number(req.params.id),
        req.body,
        req.file!,
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
