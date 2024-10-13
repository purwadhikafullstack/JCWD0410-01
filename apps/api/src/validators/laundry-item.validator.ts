import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validateAddLaundryItem = [
  body('name')
    .notEmpty()
    .withMessage('Validation: Item name is required')
    .isString(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    next();
  },
];
