import { OrderController } from '@/controllers/order.controller';
import { verifyToken } from '@/lib/verifyToken';
import { adminsGuard } from '@/middleware/adminsGuard';
import { Router } from 'express';

export class OrderRouter {
  private router: Router;
  private orderController: OrderController;

  constructor() {
    this.orderController = new OrderController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/create-user-order',
      verifyToken,
      this.orderController.createUserOrder,
    );
    this.router.get(
      '/',
      verifyToken,
      adminsGuard,
      this.orderController.getOrders,
    );
    this.router.get(
      '/outlet',
      verifyToken,
      adminsGuard,
      this.orderController.getOrdersOutlet,
    );
    this.router.get(
      '/users',
      verifyToken,
      this.orderController.getOrdersUser,
    );
    this.router.patch(
      '/',
      verifyToken,
      adminsGuard,
      this.orderController.processOrder,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
