import { NextFunction, Request, Response } from 'express';
import { body, query, validationResult } from 'express-validator';

export const validateGetWorkOrderItem = [
  query('workOrderId').notEmpty().withMessage('Validation: workOrderId is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    next();
  },
];
