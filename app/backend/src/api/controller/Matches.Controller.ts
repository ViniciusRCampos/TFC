import { Request, Response } from 'express';
import { BAD_REQUEST, MATCH_NOT_FOUND } from '../errors/ErrorMessage';
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

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const result = await this._service.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    if (!result) {
      return res.status(MATCH_NOT_FOUND.status).json({ message: MATCH_NOT_FOUND.message });
    }
    res.status(200).json({ homeTeamGoals, awayTeamGoals });
  }

  async insertMatch(req: Request, res: Response) {
    const data = { ...req.body, inProgress: true };
    const result = await this._service.insertMatch(data);
    if (!result) {
      return res.status(BAD_REQUEST.status).json({ message: BAD_REQUEST.message });
    }
    res.status(201).json(result);
  }
}
