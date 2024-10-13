import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validateAddAddress = [
  body('name')
    .notEmpty()
    .withMessage('Validation: Label name is required')
    .isString(),
  body('address')
    .notEmpty()
    .withMessage('Validation: Address is required')
    .isString(),
  body('city')
    .notEmpty()
    .withMessage('Validation: City is required')
    .isString(),
  body('district')
    .notEmpty()
    .withMessage('Validation: District is required')
    .isString(),
  body('latitude')
    .notEmpty()
    .withMessage('Validation: Latitude is required')
    .isString(),
  body('longitude')
    .notEmpty()
    .withMessage('Validation: Longitude is required')
    .isString(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    next();
  },
];
