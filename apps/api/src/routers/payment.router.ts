import { OrderController } from '@/controllers/order.controller';
import { PaymentController } from '@/controllers/payment.controller';
import { verifyToken } from '@/lib/verifyToken';
import { adminsGuard } from '@/middleware/adminsGuard';
import { Router } from 'express';

export class PaymentRouter {
  private router: Router;
  private paymentController: PaymentController;

  constructor() {
    this.paymentController = new PaymentController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/process',
      verifyToken,
      this.paymentController.processPayment,
    );
    this.router.patch(
      '/success',
      verifyToken,
      this.paymentController.updatePaymentSuccess,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
