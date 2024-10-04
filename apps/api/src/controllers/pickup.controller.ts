import { createUserService } from '@/services/admin/create-user.service';
import { getCustomersService } from '@/services/admin/get-customers.service';
import { getEmployeesService } from '@/services/admin/get-employees.service';
import { getPickupDriverService } from '@/services/pickup/get-pickup-driver.service';
import { updatePickupOrderDriverService } from '@/services/pickup/update-pickup-driver.service';
import { Role } from '@prisma/client';
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
