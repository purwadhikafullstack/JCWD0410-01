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

export const validateCompleteRegistration = [
  body('name')
    .notEmpty()
    .withMessage('Validation: Name is required')
    .isString()
    .withMessage('Validation: Name must be a string'),
  body('password')
    .notEmpty()
    .withMessage('Validation: Password is required')
    .isLength({ min: 6 })
    .isStrongPassword({
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 1,
    }),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    next();
  },
];

export const validateLogin = [
  body('email')
    .notEmpty()
    .withMessage('Validation: Email is required')
    .isEmail(),
  body('password').notEmpty().withMessage('Validation: Password is required'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    next();
  },
];

export const validateResetPassword = [
  body('password')
    .notEmpty()
    .withMessage('Validation: Password is required')
    .isLength({ min: 6 })
    .isStrongPassword({
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 1,
    }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    next();
  },
];
