import { OutletController } from '@/controllers/outlet.controller';
import { verifyToken } from '@/lib/verifyToken';
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
      this.outletController.createOutlet,
    );
    this.router.patch(
      '/update-outlet/:id',
      verifyToken,
      this.outletController.updateOutlet,
    );
    this.router.patch(
      '/delete-outlet/:id',
      verifyToken,
      this.outletController.deleteOutlet,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
