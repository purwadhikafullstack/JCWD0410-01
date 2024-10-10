import { getPickupAdminsService } from '@/services/pickup/get-pickup-admins.service';
import { getPickupDriverService } from '@/services/pickup/get-pickup-driver.service';
import { getPickupUserService } from '@/services/pickup/get-pickup-user.service';
import { updatePickupOrderDriverService } from '@/services/pickup/update-pickup-driver.service';
import { NextFunction, Request, Response } from 'express';

export class PickupController {

  async getPickupOrdersDrivers(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        page: parseInt(req.query.page as string) || 1,
        take: parseInt(req.query.take as string) || 3,
        sortOrder: (req.query.sortOrder as string) || 'asc',
        sortBy: (req.query.sortBy as string) || 'createdAt',
        search: (req.query.search as string) || '',
        status: (req.query.status as 'ONGOING' | 'REQUEST' | 'HISTORY'),
      };

      const result = await getPickupDriverService(query, res.locals.user.id);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getPickupOrdersAdmins(req: Request, res: Response, next: NextFunction) {
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

      const result = await getPickupAdminsService(query, res.locals.user.id);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getPickupOrdersUser(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        page: parseInt(req.query.page as string) || 1,
        take: parseInt(req.query.take as string) || 3,
        sortOrder: (req.query.sortOrder as string) || 'asc',
        sortBy: (req.query.sortBy as string) || 'createdAt',
        search: (req.query.search as string) || '',
        status: (req.query.status as 'ONGOING' | 'HISTORY'),
      };

      const result = await getPickupUserService(query, res.locals.user.id);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updatePickupDriver(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await updatePickupOrderDriverService(req.body, res.locals.user.id);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
