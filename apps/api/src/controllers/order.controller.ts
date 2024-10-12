import { createUserOrderService } from '@/services/order/create-user-order.service';
import { getOrderUserService } from '@/services/order/get-order-user.service';
import { getOrdersOutletService } from '@/services/order/get-orders-outlet.service';
import { getOrdersUserService } from '@/services/order/get-orders-user.service';
import { getOrdersService } from '@/services/order/get-orders.service';
import { processOrderService } from '@/services/order/process-order.service';
import { createPickupService } from '@/services/pickup/create-pickup.service';
import { OrderStatus } from '@prisma/client';
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

  async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        page: parseInt(req.query.page as string) || 1,
        take: parseInt(req.query.take as string) || 3,
        sortOrder: (req.query.sortOrder as string) || 'asc',
        sortBy: (req.query.sortBy as string) || 'createdAt',
        search: (req.query.search as string) || '',
        status: (req.query.status as OrderStatus) || "",
        outletId: Number(req.query.outletId as string) || 0, 
      };

      const result = await getOrdersService(query, res.locals.user.id);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getOrdersOutlet(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        page: parseInt(req.query.page as string) || 1,
        take: parseInt(req.query.take as string) || 3,
        sortOrder: (req.query.sortOrder as string) || 'asc',
        sortBy: (req.query.sortBy as string) || 'createdAt',
        search: (req.query.search as string) || '',
        status: (req.query.status as OrderStatus) || "ALL",
        outletId: Number(req.query.outletId as string) || 0, 
      };

      const result = await getOrdersOutletService(query, res.locals.user.id);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async processOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await processOrderService(req.body, res.locals.user.id);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getOrdersUser(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        page: parseInt(req.query.page as string) || 1,
        take: parseInt(req.query.take as string) || 3,
        sortOrder: (req.query.sortOrder as string) || 'asc',
        sortBy: (req.query.sortBy as string) || 'createdAt',
        search: (req.query.search as string) || '',
        status: (req.query.status as OrderStatus) || "",
        outletId: Number(req.query.outletId as string) || 0, 
        isPaid: (req.query.isPaid as string) || '',
      };

      const result = await getOrdersUserService(query, res.locals.user.id);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getOrderUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getOrderUserService(Number(req.params.id), res.locals.user.id);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
