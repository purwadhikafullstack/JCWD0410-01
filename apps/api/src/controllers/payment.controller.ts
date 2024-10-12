import { processPaymentService } from '@/services/payment/process-payment.service';
import { updatePaymentSuccessService } from '@/services/payment/update-payment-succes.service';
import { NextFunction, Request, Response } from 'express';

export class PaymentController {
  async processPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await processPaymentService(req.body, res.locals.user.id);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updatePaymentSuccess(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await updatePaymentSuccessService(req.body);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
