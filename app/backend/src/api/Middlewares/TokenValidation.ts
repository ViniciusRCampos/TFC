import { Request, Response, NextFunction } from 'express';
import * as JWT from 'jsonwebtoken';
import { INVALID_TOKEN, TOKEN_NOT_FOUND } from '../errors/ErrorMessage';

const secret = process.env.JWT_SECRET || 'trybefutebolclube';

export default function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('authorization');
  if (!token) {
    return res.status(TOKEN_NOT_FOUND.status).json({ message: TOKEN_NOT_FOUND.message });
  }
  const statusToken = JWT.verify(token, secret);
  if (!statusToken) {
    return res.status(INVALID_TOKEN.status).json({ message: INVALID_TOKEN.message });
  }
  next();
}
