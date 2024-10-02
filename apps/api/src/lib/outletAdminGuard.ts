import { NextFunction, Request, Response } from 'express';

export const adminGuard = (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.user.role !== 'ADMIN' || res.locals.user.role !== 'OUTLET_ADMIN') {
    return res.status(400).send('Only admin or outlet admin may access');
  }

  next();
};
