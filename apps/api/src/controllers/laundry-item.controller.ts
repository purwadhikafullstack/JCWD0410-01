import { createLaundryItemsService } from '@/services/laundry-item/create-laundry-item.service';
import { deleteLaundryItemService } from '@/services/laundry-item/delete-laundry-item.service';
import { getLaundryItemService } from '@/services/laundry-item/get-laundry-item.service';
import { getLaundryItemsService } from '@/services/laundry-item/get-laundry-items.service';
import { updateLaundryItemsService } from '@/services/laundry-item/update-laundry-item.service';
import { NextFunction, Request, Response } from 'express';

export class LaundryItemController {
  async getLaundryItems(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        page: parseInt(req.query.page as string) || 1,
        take: parseInt(req.query.take as string) || 3,
        sortOrder: (req.query.sortOrder as string) || 'desc',
        sortBy: (req.query.sortBy as string) || 'createdAt',
      };
      const result = await getLaundryItemsService(query);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getLaundryItem(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getLaundryItemService(Number(req.params.id));
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async createLaundryItem(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await createLaundryItemsService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateLaundryItem(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await updateLaundryItemsService(
        req.body,
        Number(req.params.id),
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteLaundryItem(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await deleteLaundryItemService(Number(req.params.id));
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
