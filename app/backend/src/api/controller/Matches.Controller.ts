import { Request, Response } from 'express';
import { MATCH_NOT_FOUND } from '../errors/ErrorMessage';
import IServiceMatches from '../interfaces/IServiceMatches';

export default class MatchesController {
  private _service: IServiceMatches;

  constructor(service: IServiceMatches) {
    this._service = service;
  }

  async readAll(req: Request, res: Response) {
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

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this._service.finishMatch(Number(id));
    if (!result) {
      return res.status(MATCH_NOT_FOUND.status).json({ message: MATCH_NOT_FOUND.message });
    }
    res.status(200).json({ message: 'Finished' });
  }
}
