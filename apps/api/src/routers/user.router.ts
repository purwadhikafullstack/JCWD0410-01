import { UserController } from '@/controllers/user.controller';
import { uploader } from '@/lib/multer';
import { verifyToken } from '@/lib/verifyToken';
import { validateEmail, validatePassword } from '@/validators/user.validator';
import { Router } from 'express';

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', verifyToken, this.userController.getUser);
    this.router.patch(
      '/update-profile',
      verifyToken,
      uploader().single('profilePicture'),
      this.userController.updateProfileController,
    );
    this.router.patch(
      '/update-email',
      verifyToken,
      validateEmail,
      this.userController.updateEmailController,
    );
    this.router.patch(
      '/verify-email',
      verifyToken,
      this.userController.VerifyEmailController,
    );
    this.router.patch(
      '/update-password',
      verifyToken,
      validatePassword,
      this.userController.updatePasswordController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
