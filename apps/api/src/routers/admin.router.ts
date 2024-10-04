import { AdminController } from '@/controllers/admin.controller';
import { verifyToken } from '@/lib/verifyToken';
import { adminGuard } from '@/middleware/adminGuard';
import { adminsGuard } from '@/middleware/adminsGuard';
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
    this.router.get('/customers', verifyToken, adminsGuard, this.adminController.getCustomersAdmin);
    this.router.get('/employees', verifyToken, adminsGuard, this.adminController.getEmployeesAdmin);
    this.router.get('/:id', verifyToken, adminGuard, this.adminController.getUserAdmin)  
    this.router.post('/', this.adminController.createUserAdmin);
    // this.router.post(
    //   '/',
    //   verifyToken,
    //   uploader().single('thumbnail'),
    //   this.eventController.createEvent,
    // );
  }

  getRouter(): Router {
    return this.router;
  }
}