import { Request, Response, NextFunction } from 'express';
import { ALL_FIELDS_REQUIRED, INVALID_LOGIN } from '../errors/ErrorMessage';

const validateEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(email);
};

export default function loginValidation(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(ALL_FIELDS_REQUIRED.status).json({ message: ALL_FIELDS_REQUIRED.message });
  }
  if (!validateEmail(email) || password.length < 6) {
    return res.status(INVALID_LOGIN.status).json({ message: INVALID_LOGIN.message });
  }

  return next();
}
