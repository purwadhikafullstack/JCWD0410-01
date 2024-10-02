import { getUnreadNotificationsCountService } from '@/services/notification/get-unread-notifications-count.service';
import { NextFunction, Request, Response } from 'express';

export class NotificationController {

  async getUnreadNotificationsCount(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getUnreadNotificationsCountService(res.locals.user.id);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  // async updatePickupDriver(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction,
  // ) {
  //   try {
  //     const result = await updatePickupOrderDriverService(req.body, res.locals.user.id);
  //     return res.status(200).send(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
