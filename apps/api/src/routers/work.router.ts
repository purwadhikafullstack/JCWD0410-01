import { WorkController } from '@/controllers/work.controller';
import { verifyToken } from '@/lib/verifyToken';
import { adminsGuard } from '@/middleware/adminsGuard';
import { workerGuard } from '@/middleware/workerGuard';
import { Router } from 'express';

export class WorkRouter {
  private router: Router;
  private workController: WorkController;

  constructor() {
    this.workController = new WorkController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/workers', verifyToken, workerGuard, this.workController.getWorkOrdersWorker);
    this.router.get('/admins', verifyToken, adminsGuard, this.workController.getWorkOrdersAdmins);
    this.router.get('/:id', verifyToken, adminsGuard, this.workController.getWorkOrderAdmins);
    this.router.patch('/workers', verifyToken, workerGuard, this.workController.updateWorkOrdersWorker);
    this.router.patch('/bypass', verifyToken, adminsGuard, this.workController.bypassWorkOrder);
  }

  getRouter(): Router {
    return this.router;
  }
}