import { createUserOrderService } from '@/services/order/create-user-order.service';
import { createPickupService } from '@/services/pickup/create-pickup.service';
import { NextFunction, Request, Response } from 'express';

export class OrderController {
  // createUserOrderService mengandung createOrder, createPickup, createDelivery, createNotification dalam satu kesatuan
  async createUserOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await createUserOrderService(req.body, res.locals.user.id);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
