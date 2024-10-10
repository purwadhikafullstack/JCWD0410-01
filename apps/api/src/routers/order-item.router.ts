import { OrderItemController } from '@/controllers/order-item.controller';
import { verifyToken } from '@/lib/verifyToken';
import { Router } from 'express';

export class OrderItemRouter {
  private router: Router;
  private orderItemController: OrderItemController;

  constructor() {
    this.orderItemController = new OrderItemController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      '/work-orders',
      verifyToken,
      this.orderItemController.getOrderItemsWorkOrder,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
