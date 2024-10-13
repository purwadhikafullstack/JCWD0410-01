import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const validateProcessOrder = [
  body('weight').notEmpty().withMessage('Validation: Weight is required'),
  body('orderId').notEmpty().withMessage('Validation: order Id is required'),
  body('orderItems')
    .notEmpty()
    .withMessage('Validation: orderItems is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    next();
  },
];

export const validateCreateUserOrder = [
  body('pickupStatus')
    .notEmpty()
    .withMessage('Validation: pickupStatus is required'),
  body('pickupLatitude')
    .notEmpty()
    .withMessage('Validation: pickupLatitude is required'),
  body('pickupLongitude')
    .notEmpty()
    .withMessage('Validation: pickupLongitude is required'),
  body('pickupFee').notEmpty().withMessage('Validation: pickupFee is required'),
  body('pickupAddressId')
    .notEmpty()
    .withMessage('Validation: pickupAddressId is required'),
  body('pickupAddress')
    .notEmpty()
    .withMessage('Validation: pickupAddress is required'),
  body('deliveryStatus')
    .notEmpty()
    .withMessage('Validation: deliveryStatus is required'),
  body('deliveryLatitude')
    .notEmpty()
    .withMessage('Validation: deliveryLatitude is required'),
  body('deliveryLongitude')
    .notEmpty()
    .withMessage('Validation: deliveryLongitude is required'),
  body('deliveryFee')
    .notEmpty()
    .withMessage('Validation: deliveryFee is required'),
  body('deliveryAddressId')
    .notEmpty()
    .withMessage('Validation: deliveryAddressId is required'),
  body('outletId').notEmpty().withMessage('Validation: outletId is required'),
  body('outletName')
    .notEmpty()
    .withMessage('Validation: outletName is required'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    next();
  },
];

export const validateConfirmOrderDelivery = [
  body('orderId').notEmpty().withMessage('Validation: order Id is required'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    next();
  },
];
