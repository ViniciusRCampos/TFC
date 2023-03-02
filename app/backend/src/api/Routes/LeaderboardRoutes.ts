import { Router, Request, Response } from 'express';
import LeaderController from '../controller/Leaderboard.Controller';

const leaderboardRoute = Router();

leaderboardRoute.get('/leaderboard/home', (req: Request, res: Response) =>
  LeaderController.test(req, res));

export default leaderboardRoute;
