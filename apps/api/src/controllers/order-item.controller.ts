import {  getOrderItemsWorkOrderService } from '@/services/order-item/get-order-items.service';
import { NextFunction, Request, Response } from 'express';

export class OrderItemController {
  async getOrderItemsWorkOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        page: parseInt(req.query.page as string) || 1,
        take: parseInt(req.query.take as string) || 3,
        sortOrder: (req.query.sortOrder as string) || 'desc',
        sortBy: (req.query.sortBy as string) || 'createdAt',
        workOrderId: parseInt(req.query.workOrderId as string) || 0,
      };
      const result = await getOrderItemsWorkOrderService(query);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
