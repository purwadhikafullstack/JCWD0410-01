import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validateBypassWork = [
  body('id').notEmpty().withMessage('Validation: Id is required'),
  body('bypassNote').notEmpty().withMessage('Validation: bypassNote is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    next();
  },
];

export const validateUpdateWork = [
  body('id').notEmpty().withMessage('Validation: Id is required'),
  body('status').notEmpty().withMessage('Validation: status is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    next();
  },
];
