import { Request, Response } from 'express';
import IServiceMatches from '../interfaces/IServiceMatches';

export default class MatchesController {
  private _service: IServiceMatches;

  constructor(service: IServiceMatches) {
    this._service = service;
  }

  async readAll(_req: Request, res: Response) {
    const result = await this._service.readAll();
    res.status(200).json(result);
  }

  async filterProgress(req: Request, res: Response) {
    const filter = req.query.inProgress;
    const data = await this._service.readAll();
    if (filter === 'true') {
      const result = data.filter((match) => match.inProgress === true);
      return res.status(200).json(result);
    }
    if (filter === 'false') {
      const result = data.filter((match) => match.inProgress === false);
      return res.status(200).json(result);
    }
    return res.status(200).json(data);
  }
}
