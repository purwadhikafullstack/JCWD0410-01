import { NextFunction, Request, Response } from 'express';

export const adminGuard = (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.user.role !== 'ADMIN') {
    return res.status(400).send('Only admin may access');
  }

  next();
};