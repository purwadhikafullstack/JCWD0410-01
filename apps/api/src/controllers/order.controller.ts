import { createPickupService } from '@/services/pickup/create-pickup.service';
import { NextFunction, Request, Response } from 'express';

export class OrderController {
  // CreatePickupService mengandung createOrder dan createDelivery dalam satu kesatuan
  async createPickupOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await createPickupService(req.body, res.locals.user.id);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
