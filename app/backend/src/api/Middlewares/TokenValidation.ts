import { Request, Response, NextFunction } from 'express';
import * as JWT from 'jsonwebtoken';
import { INVALID_TOKEN, TOKEN_NOT_FOUND } from '../errors/ErrorMessage';

const secret = process.env.JWT_SECRET || 'trybefutebolclube';

export default function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('authorization');
  if (!token) {
    return res.status(TOKEN_NOT_FOUND.status).json({ message: TOKEN_NOT_FOUND.message });
  }
  try {
    const statusToken = JWT.verify(token, secret);
    res.locals.tokenData = statusToken;
    next();
  } catch (error) {
    return res.status(INVALID_TOKEN.status).json({ message: INVALID_TOKEN.message });
  }
}
