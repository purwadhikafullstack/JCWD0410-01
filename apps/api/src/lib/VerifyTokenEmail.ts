import { JWT_SECRET, JWT_SECRET_EMAIL } from '@/config';
import { NextFunction, Request, Response } from 'express';
import { TokenExpiredError, verify } from 'jsonwebtoken';

interface PayloadToken {
  email: string;
}

export const getEmailFromToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send({
      message: 'token is missing',
    });
  }

  verify(token, JWT_SECRET_EMAIL!, (err, payload) => {
    if (err) {
      if (err instanceof TokenExpiredError) {
        return res.status(403).send({ message: 'token expired' });
      } else {
        return res.status(401).send({ message: 'unauthorized' });
      }
    }

    res.locals.user = payload as PayloadToken;

    next();
  });
};
