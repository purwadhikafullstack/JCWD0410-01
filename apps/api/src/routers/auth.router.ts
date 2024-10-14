import { AuthController } from '@/controllers/auth.controller';
import { getEmailFromToken } from '@/lib/VerifyTokenEmail';
import { verifyTokenForgotPassword } from '@/lib/verifyTokenForgotPassword';
import {
  validateCompleteRegistration,
  validateEmail,
  validateLogin,
  validateResetPassword,
} from '@/validators/auth.validator';
import { Router } from 'express';

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/register', validateEmail, this.authController.register);
    this.router.get(
      '/get-email-token',
      getEmailFromToken,
      this.authController.getEmailFromToken,
    );
    this.router.patch(
      '/register/complete-registration/',
      getEmailFromToken,
      validateCompleteRegistration,
      this.authController.completeRegistration,
    );
    this.router.post('/login', validateLogin, this.authController.login);
    this.router.post(
      '/login/google',
      this.authController.loginWithGoogleController,
    );
    this.router.post(
      '/forgot-password',
      validateEmail,
      this.authController.forgotPassword,
    );
    this.router.patch(
      '/reset-password',
      verifyTokenForgotPassword,
      validateResetPassword,
      this.authController.resetPassword,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
