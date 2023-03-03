import { Request, Response } from 'express';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';

export default class leaderboardController {
  private _service: IServiceLeaderboard;

  constructor(service: IServiceLeaderboard) {
    this._service = service;
  }

  async board(req: Request, res: Response) {
    const path = req.path.split('/')[2];
    const data = await this._service.board(path);
    return res.status(200).json(data);
  }
}
