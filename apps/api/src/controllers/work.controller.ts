import { createUserService } from '@/services/admin/create-user.service';
import { getCustomersService } from '@/services/admin/get-customers.service';
import { getEmployeesService } from '@/services/admin/get-employees.service';
import { getPickupAdminsService } from '@/services/pickup/get-pickup-admins.service';
import { getPickupDriverService } from '@/services/pickup/get-pickup-driver.service';
import { updatePickupOrderDriverService } from '@/services/pickup/update-pickup-driver.service';
import { getWorkOrdersWorkerService } from '@/services/worker/get-work-orders-worker.service';
import { updateWorkOrdersWorkersService } from '@/services/worker/update-work-orders-worker.service';
import { Role } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

export class WorkController {

  async getWorkOrdersWorker(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        page: parseInt(req.query.page as string) || 1,
        take: parseInt(req.query.take as string) || 3,
        sortOrder: (req.query.sortOrder as string) || 'asc',
        sortBy: (req.query.sortBy as string) || 'createdAt',
        search: (req.query.search as string) || '',
        status: (req.query.status as 'ONGOING' | 'REQUEST' | 'HISTORY'),
      };

      const result = await getWorkOrdersWorkerService(query, res.locals.user.id);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  // async getPickupOrdersAdmins(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const query = {
  //       page: parseInt(req.query.page as string) || 1,
  //       take: parseInt(req.query.take as string) || 5,
  //       sortOrder: (req.query.sortOrder as string) || 'asc',
  //       sortBy: (req.query.sortBy as string) || 'createdAt',
  //       search: (req.query.search as string) || '',
  //       status: (req.query.status as 'ONGOING' | 'REQUEST' | 'HISTORY' | 'ALL') || 'ALL',
  //       outletId: (req.query.outletId as string) || '',
  //     };

  //     const result = await getPickupAdminsService(query, res.locals.user.id);
  //     return res.status(200).send(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async updateWorkOrdersWorker(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await updateWorkOrdersWorkersService(req.body, res.locals.user.id);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
