import { AuthController } from '@/controllers/auth.controller';
import { getEmailFromToken } from '@/lib/getEmailFromToken';
import { verifyToken } from '@/lib/verifyToken';
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
    this.router.post('/register', this.authController.register);
    this.router.get(
      '/get-email-token',
      getEmailFromToken,
      this.authController.getEmailFromToken,
    );
    this.router.patch(
      '/register/complete-registration/',
      getEmailFromToken,
      this.authController.completeRegistration,
    );
    this.router.post('/login', this.authController.login);
    this.router.post(
      '/login/google',
      this.authController.loginWithGoogleController,
    );
    this.router.post('/forgot-password', this.authController.forgotPassword);
    this.router.patch(
      '/reset-password',
      verifyToken,
      this.authController.resetPassword,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
