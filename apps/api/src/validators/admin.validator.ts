import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validateCreateUseradmin = [
  body('name').notEmpty().withMessage('Validation: Name is required'),
  body('email')
    .notEmpty()
    .withMessage('Validation: Email is required')
    .isEmail(),
  body('role')
    .notEmpty()
    .withMessage('Validation: Role is missing')
    .custom((value) => {
      if (
        value !== 'ADMIN' &&
        value !== 'OUTLET_ADMIN' &&
        value !== 'WORKER' &&
        value !== 'DRIVER'
      ) {
        throw new Error('Role validation Error');
      } else {
        return value;
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('Validation: Password is required')
    .isLength({ min: 6 })
    .isStrongPassword({
      minNumbers: 1,
      minUppercase: 1,
      minLowercase: 1,
      minSymbols: 1,
    }),
  body('phoneNumber')
    .notEmpty()
    .withMessage('Validation: Phone Number is required'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    next();
  },
];

export const validateDeleteUserAdmin = [
  body('id').notEmpty().withMessage('Validation: Id is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    next();
  },
];
