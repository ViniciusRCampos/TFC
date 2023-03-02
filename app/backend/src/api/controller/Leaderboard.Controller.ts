import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardServices';

export default class leaderController {
  static async test(_req: Request, res: Response) {
    const data = await LeaderboardService.board();

    res.status(200).json(data);
  }
}
