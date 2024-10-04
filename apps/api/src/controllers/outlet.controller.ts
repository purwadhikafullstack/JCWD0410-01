import { createOutletService } from '@/services/outlet/create-outlet.service';
import { deleteOutletService } from '@/services/outlet/delete-outlet.service';
import { getOutletService } from '@/services/outlet/get-outlet.service';
import { getOutletsService } from '@/services/outlet/get-outlets.service';
import { updateOutletService } from '@/services/outlet/update-outlet.service';
import { NextFunction, Request, Response } from 'express';

export class OutletController {
  async getOutlets(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        page: parseInt(req.query.page as string) || 1,
        take: parseInt(req.query.take as string) || 3,
        sortOrder: (req.query.sortOrder as string) || 'desc',
        sortBy: (req.query.sortBy as string) || 'createdAt',
        search: (req.query.search as string) || '',
      };
      const result = await getOutletsService(query);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getOutlet(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getOutletService(Number(req.params.id));
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async createOutlet(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await createOutletService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async updateOutlet(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await updateOutletService(Number(req.params.id), req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteOutlet(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await deleteOutletService(Number(req.params.id));
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
