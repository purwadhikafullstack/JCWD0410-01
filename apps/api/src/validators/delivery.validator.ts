import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validateUpdateDelivery = [
  body('id').notEmpty().withMessage('Validation: Id is required'),
  body('status').notEmpty().withMessage('Validation: Status is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    next();
  },
];
