import { Request, Response } from 'express';
import { ALL_FIELDS_REQUIRED } from '../errors/ErrorMessage';
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
      return res.status(ALL_FIELDS_REQUIRED.status).json({ message: ALL_FIELDS_REQUIRED.message });
    }
    const token = createToken(result);
    res.status(200).json({ token });
  }
}
