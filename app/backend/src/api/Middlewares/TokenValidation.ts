import * as JWT from 'jsonwebtoken';
import { INVALID_TOKEN } from '../errors/ErrorMessage';
import InvalidTokenError from '../errors/InvalidTokenError';

const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET || 'trybefutebolclube';
  try {
    const statusToken = JWT.verify(token, secret);
    return statusToken;
  } catch (err) {
    throw new InvalidTokenError(INVALID_TOKEN.message);
  }
};

export default verifyToken;
