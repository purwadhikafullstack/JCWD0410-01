import { getNotificationsService } from '@/services/notification/get-notifications.service';
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

  async getNotifications(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        page: parseInt(req.query.page as string) || 1,
        take: parseInt(req.query.take as string) || 3,
        sortOrder: (req.query.sortOrder as string) || 'asc',
        sortBy: (req.query.sortBy as string) || 'createdAt',
        search: (req.query.search as string) || '',
        unRead: (req.query.unRead as string) || '',
      };

      const result = await getNotificationsService(query, res.locals.user.id);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
