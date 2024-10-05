import { createUserService } from '@/services/admin/create-user.service';
import { deleteUserService } from '@/services/admin/delete-user.service';
import { getCustomersService } from '@/services/admin/get-customers.service';
import { getEmployeesService } from '@/services/admin/get-employees.service';
import { getUserAdminService } from '@/services/admin/get-user-admin.service';
import { Role } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

export class AdminController {
  async getCustomersAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        page: parseInt(req.query.page as string) || 1,
        take: parseInt(req.query.take as string) || 3,
        sortOrder: (req.query.sortOrder as string) || 'asc',
        sortBy: (req.query.sortBy as string) || 'createdAt',
        email: (req.query.email as string) || '',
        name: (req.query.name as string) || '',
        phone: (req.query.phone as string) || '',
        search: (req.query.search as string) || '',
        isVerified: (req.query.isVerified as string) || '',
      };

      const result = await getCustomersService(query);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getEmployeesAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        page: parseInt(req.query.page as string) || 1,
        take: parseInt(req.query.take as string) || 3,
        sortOrder: (req.query.sortOrder as string) || 'asc',
        sortBy: (req.query.sortBy as string) || 'createdAt',
        email: (req.query.email as string) || '',
        name: (req.query.name as string) || '',
        phone: (req.query.phone as string) || '',
        role: (req.query.role as Role) || '',
        isVerified: (req.query.isVerified as string) || '',
        outletId: parseInt(req.query.outletId as string) || undefined,
      };

      const result = await getEmployeesService(query, res.locals.user.id);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async createUserAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await createUserService(req.body, req.file!);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteUserAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await deleteUserService(req.body);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getUserAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getUserAdminService(Number(req.params.id));
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
