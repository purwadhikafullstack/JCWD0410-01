import { NextFunction, Request, Response } from 'express';

export const driverGuard = (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.user.role !== 'DRIVER') {
    return res.status(400).send('Only driver may access');
  }

  next();
};
