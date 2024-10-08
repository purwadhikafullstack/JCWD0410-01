import { WorkController } from '@/controllers/work.controller';
import { verifyToken } from '@/lib/verifyToken';
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
    this.router.patch('/workers', verifyToken, workerGuard, this.workController.updateWorkOrdersWorker);
  }

  getRouter(): Router {
    return this.router;
  }
}