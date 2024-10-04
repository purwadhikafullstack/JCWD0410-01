import { LaundryItemController } from '@/controllers/laundry-item.controller';
import { verifyToken } from '@/lib/verifyToken';
import { Router } from 'express';

export class LaundryItemRouter {
  private router: Router;
  private laundryItemController: LaundryItemController;

  constructor() {
    this.laundryItemController = new LaundryItemController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      '/',
      verifyToken,
      this.laundryItemController.getLaundryItems,
    );
    this.router.get(
      '/:id',
      verifyToken,
      this.laundryItemController.getLaundryItem,
    );
    this.router.post(
      '/',
      verifyToken,
      this.laundryItemController.createLaundryItem,
    );
    this.router.patch(
      '/update-item/:id',
      verifyToken,
      this.laundryItemController.updateLaundryItem,
    );
    this.router.patch(
      '/delete-item/:id',
      verifyToken,
      this.laundryItemController.deleteLaundryItem,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
