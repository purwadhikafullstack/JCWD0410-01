import { DeliveryController } from '@/controllers/delivery.controller';
import { PickupController } from '@/controllers/pickup.controller';
import { verifyToken } from '@/lib/verifyToken';
import { adminsGuard } from '@/middleware/adminsGuard';
import { driverGuard } from '@/middleware/driverGuard';
import { Router } from 'express';

export class DeliveryRouter {
  private router: Router;
  private deliveryController: DeliveryController;

  constructor() {
    this.deliveryController = new DeliveryController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      '/drivers',
      verifyToken,
      driverGuard,
      this.deliveryController.getDeliveryOrdersDrivers,
    );
    this.router.get(
      '/admins',
      verifyToken,
      adminsGuard,
      this.deliveryController.getDeliveryOrdersAdmins,
    );
    this.router.get(
      '/users',
      verifyToken,
      this.deliveryController.getDeliveryOrdersUser,
    );
    this.router.patch(
      '/drivers',
      verifyToken,
      driverGuard,
      this.deliveryController.updateDeliveryDriver,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
