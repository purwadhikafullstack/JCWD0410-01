import { OrderController } from '@/controllers/order.controller';
import { verifyToken } from '@/lib/verifyToken';
import { adminsGuard } from '@/middleware/adminsGuard';
import { validateConfirmOrderDelivery, validateCreateUserOrder, validateProcessOrder } from '@/validators/order.validator';
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
      validateCreateUserOrder,
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
    this.router.get(
      '/chart',
      verifyToken,
      adminsGuard,
      this.orderController.getOrderChart,
    );
    this.router.get(
      '/:id',
      verifyToken,
      this.orderController.getOrderUser,
    );
    this.router.patch(
      '/',
      verifyToken,
      adminsGuard,
      validateProcessOrder,
      this.orderController.processOrder,
    );
    this.router.patch(
      '/confirm',
      verifyToken,
      validateConfirmOrderDelivery,
      this.orderController.confirmOrder,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
