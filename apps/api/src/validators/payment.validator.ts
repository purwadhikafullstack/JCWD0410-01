import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validateProcessPayment = [
  body('orderId').notEmpty().withMessage('Validation: order Id is required'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    next();
  },
];

export const validatePaymentSuccess = [
  body('invoice').notEmpty().withMessage('Validation: invoice is required'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    next();
  },
];