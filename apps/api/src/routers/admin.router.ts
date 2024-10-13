import { AdminController } from '@/controllers/admin.controller';
import { uploader } from '@/lib/multer';
import { verifyToken } from '@/lib/verifyToken';
import { adminGuard } from '@/middleware/adminGuard';
import { adminsGuard } from '@/middleware/adminsGuard';
import { validateCreateUseradmin, validateDeleteUserAdmin } from '@/validators/admin.validator';
import { Router } from 'express';

export class AdminRouter {
  private router: Router;
  private adminController: AdminController;

  constructor() {
    this.adminController = new AdminController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      '/customers',
      verifyToken,
      adminsGuard,
      this.adminController.getCustomersAdmin,
    );
    this.router.get(
      '/employees',
      verifyToken,
      adminsGuard,
      this.adminController.getEmployeesAdmin,
    );
    this.router.get(
      '/employee/:id',
      verifyToken,
      adminsGuard,
      this.adminController.getEmployeeAdmin,
    );
    this.router.get(
      '/:id',
      verifyToken,
      adminGuard,
      this.adminController.getUserAdmin,
    );

    this.router.post(
      '/',
      verifyToken,
      adminGuard,
      uploader().single('profilePicture'), validateCreateUseradmin,
      this.adminController.createUserAdmin,
    );

    this.router.patch(
      '/update/:id',
      verifyToken,
      adminGuard,
      uploader().single('profilePicture'),
      this.adminController.updateEmployeeAdmin,
    );

    this.router.patch(
      '/delete',
      verifyToken,
      adminGuard,
      validateDeleteUserAdmin,
      this.adminController.deleteUserAdmin,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
