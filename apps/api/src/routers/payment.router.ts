import { PaymentController } from '@/controllers/payment.controller';
import { verifyToken } from '@/lib/verifyToken';
import { validatePaymentSuccess, validateProcessPayment } from '@/validators/payment.validator';
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
      validateProcessPayment,
      this.paymentController.processPayment,
    );
    this.router.patch(
      '/success',
      verifyToken,
      validatePaymentSuccess,
      this.paymentController.updatePaymentSuccess,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
