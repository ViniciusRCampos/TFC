import 'dotenv/config';
import * as JWT from 'jsonwebtoken';
import IUser from '../interfaces/IUsers';

const createToken = (payload: IUser) => {
  const secret = process.env.JWT_SECRET || 'trybefutebolclube';
  const { role, username, email } = payload;
  const token = JWT.sign({ role, username, email }, secret);
  return token;
};

export default createToken;
