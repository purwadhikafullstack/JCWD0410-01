import { OutletController } from '@/controllers/outlet.controller';
import { verifyToken } from '@/lib/verifyToken';
import { adminGuard } from '@/middleware/adminGuard';
import { validateAddOutlet } from '@/validators/outlet.validator';
import { Router } from 'express';

export class OutletRouter {
  private router: Router;
  private outletController: OutletController;

  constructor() {
    this.outletController = new OutletController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.outletController.getOutlets);
    this.router.get('/:id', verifyToken, this.outletController.getOutlet);
    this.router.post(
      '/',
      verifyToken,
      validateAddOutlet,
      adminGuard,
      this.outletController.createOutlet,
    );
    this.router.patch(
      '/update-outlet/:id',
      verifyToken,
      adminGuard,
      this.outletController.updateOutlet,
    );
    this.router.patch(
      '/delete-outlet/:id',
      verifyToken,
      adminGuard,
      this.outletController.deleteOutlet,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
