import { PickupController } from '@/controllers/pickup.controller';
import { verifyToken } from '@/lib/verifyToken';
import { adminsGuard } from '@/middleware/adminsGuard';
import { driverGuard } from '@/middleware/driverGuard';
import { validateUpdatePickup } from '@/validators/pickup.validator';
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
    this.router.get(
      '/drivers',
      verifyToken,
      driverGuard,
      this.pickupController.getPickupOrdersDrivers,
    );
    this.router.get(
      '/admins',
      verifyToken,
      adminsGuard,
      this.pickupController.getPickupOrdersAdmins,
    );
    this.router.get(
      '/users',
      verifyToken,
      this.pickupController.getPickupOrdersUser,
    );
    this.router.patch(
      '/drivers',
      verifyToken,
      driverGuard,
      validateUpdatePickup,
      this.pickupController.updatePickupDriver,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
