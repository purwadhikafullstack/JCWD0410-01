import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validateEmail = [
  body('email')
    .notEmpty()
    .withMessage('Validation: Email is required')
    .isEmail(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    next();
  },
];

export const validatePassword = [
  body('oldPassword')
    .notEmpty()
    .withMessage('Validation: Old Password is required'),
  body('password')
    .notEmpty()
    .withMessage('Validation: New Password is required')
    .isLength({ min: 6 })
    .isStrongPassword({
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 1,
    }),
  body('confirmPassword')
    .notEmpty()
    .withMessage('Validation: Confirm Password is required')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('The passwords do not match'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    next();
  },
];
