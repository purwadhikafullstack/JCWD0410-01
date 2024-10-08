import { NextFunction, Request, Response } from 'express';

export const workerGuard = (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.user.role !== 'WORKER') {
    return res.status(400).send('Only worker may access');
  }

  next();
};
