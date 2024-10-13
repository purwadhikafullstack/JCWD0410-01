import { OrderItemController } from '@/controllers/order-item.controller';
import { verifyToken } from '@/lib/verifyToken';
import { validateGetWorkOrderItem } from '@/validators/order-item.validator';
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
      validateGetWorkOrderItem,
      this.orderItemController.getOrderItemsWorkOrder,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
