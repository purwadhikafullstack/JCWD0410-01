import { NotificationController } from '@/controllers/notification.controller';
import { PickupController } from '@/controllers/pickup.controller';
import { verifyToken } from '@/lib/verifyToken';
import { Router } from 'express';

export class NotificationRouter {
  private router: Router;
  private notificationController: NotificationController;

  constructor() {
    this.notificationController = new NotificationController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/count', verifyToken, this.notificationController.getUnreadNotificationsCount);
    this.router.get('/', verifyToken, this.notificationController.getNotifications);
  }

  getRouter(): Router {
    return this.router;
  }
}