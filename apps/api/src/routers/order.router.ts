import { OrderController } from '@/controllers/order.controller';
import { verifyToken } from '@/lib/verifyToken';
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
    this.router.get('/', verifyToken, this.orderController.getOrders);
    this.router.get(
      '/outlet',
      verifyToken,
      this.orderController.getOrdersOutlet,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
