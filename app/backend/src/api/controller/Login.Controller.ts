import { Request, Response } from 'express';
import { INVALID_LOGIN, INVALID_TOKEN } from '../errors/ErrorMessage';
import IServiceLogin from '../interfaces/IServiceLogin';
import createToken from '../utils/TokenJWT';

export default class LoginController {
  private _service: IServiceLogin;

  constructor(service: IServiceLogin) {
    this._service = service;
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await this._service.login({ email, password });
    if (!result) {
      return res.status(INVALID_LOGIN.status).json({ message: INVALID_LOGIN.message });
    }
    const token = createToken(result);
    res.status(200).json({ token });
  }

  async findRoleUser(req: Request, res: Response) {
    const { email } = res.locals.tokenData;
    const result = await this._service.findRoleUser(email);
    if (!result) {
      return res.status(INVALID_TOKEN.status).json({ message: INVALID_TOKEN.message });
    }
    return res.status(200).json({ role: result.role });
  }
}
