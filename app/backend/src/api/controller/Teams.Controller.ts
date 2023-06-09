import { Request, Response } from 'express';
import { ID_NOT_FOUND } from '../errors/ErrorMessage';
import IServiceTeams from '../interfaces/IServiceTeams';

export default class TeamsController {
  private _service: IServiceTeams;

  constructor(service: IServiceTeams) {
    this._service = service;
  }

  async readAll(_req: Request, res: Response) {
    const result = await this._service.readAll();
    res.status(200).json(result);
  }

  async readTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this._service.readTeamById(Number(id));
    if (!result) {
      return res.status(ID_NOT_FOUND.status).json({ message: ID_NOT_FOUND.message });
    }
    res.status(200).json(result);
  }
}
