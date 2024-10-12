import { getDeliveryUserService } from "@/services/delivery/get-deliver-user.service";
import { getDeliveryAdminsService } from "@/services/delivery/get-delivery-admins.service";
import { getDeliveryDriverService } from "@/services/delivery/get-delivery-driver.service";
import { updateDeliveryOrderDriverService } from "@/services/delivery/update-deliver.service";
import { NextFunction, Request, Response } from 'express';


export class DeliveryController {

  async getDeliveryOrdersDrivers(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        page: parseInt(req.query.page as string) || 1,
        take: parseInt(req.query.take as string) || 3,
        sortOrder: (req.query.sortOrder as string) || 'asc',
        sortBy: (req.query.sortBy as string) || 'createdAt',
        search: (req.query.search as string) || '',
        status: (req.query.status as 'ONGOING' | 'REQUEST' | 'HISTORY'),
      };

      const result = await getDeliveryDriverService(query, res.locals.user.id);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getDeliveryOrdersAdmins(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        page: parseInt(req.query.page as string) || 1,
        take: parseInt(req.query.take as string) || 5,
        sortOrder: (req.query.sortOrder as string) || 'asc',
        sortBy: (req.query.sortBy as string) || 'createdAt',
        search: (req.query.search as string) || '',
        status: (req.query.status as 'ONGOING' | 'REQUEST' | 'HISTORY' | 'ALL') || 'ALL',
        outletId: (req.query.outletId as string) || '',
      };

      const result = await getDeliveryAdminsService(query, res.locals.user.id);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getDeliveryOrdersUser(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        page: parseInt(req.query.page as string) || 1,
        take: parseInt(req.query.take as string) || 3,
        sortOrder: (req.query.sortOrder as string) || 'asc',
        sortBy: (req.query.sortBy as string) || 'createdAt',
        search: (req.query.search as string) || '',
        status: (req.query.status as 'ONGOING' | 'HISTORY' | 'ALL'),
      };

      const result = await getDeliveryUserService(query, res.locals.user.id);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateDeliveryDriver(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await updateDeliveryOrderDriverService(req.body, res.locals.user.id);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
