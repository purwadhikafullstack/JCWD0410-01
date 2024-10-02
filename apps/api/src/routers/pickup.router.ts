import { PickupController } from '@/controllers/pickup.controller';
import { verifyToken } from '@/lib/verifyToken';
import { Router } from 'express';

export class PickupRouter {
  private router: Router;
  private pickupController: PickupController;

  constructor() {
    this.pickupController = new PickupController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/drivers', verifyToken, this.pickupController.getPickupOrdersDrivers);
    this.router.patch('/drivers', verifyToken, this.pickupController.updatePickupDriver);
  }

  getRouter(): Router {
    return this.router;
  }
}