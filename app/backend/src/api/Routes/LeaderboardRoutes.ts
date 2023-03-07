import { Router, Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardServices';
import LeaderboardController from '../controller/Leaderboard.Controller';

const leaderboardRoute = Router();
const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRoute.get('/leaderboard/home', (req: Request, res: Response) => {
  leaderboardController.board(req, res);
});

leaderboardRoute.get('/leaderboard/away', (req: Request, res: Response) => {
  leaderboardController.board(req, res);
});

leaderboardRoute.get('/leaderboard', (req: Request, res: Response) => {
  leaderboardController.board(req, res);
});

export default leaderboardRoute;
