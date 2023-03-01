import { Request, Response, Router } from 'express';
import MatchesController from '../controller/Matches.Controller';
import MatchesService from '../services/MatchesServices';

const matchesRoute = Router();
const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchesRoute.get('/matches', (req: Request, res: Response) => {
  matchesController.filterProgress(req, res);
});
// matchesRoute.get('/matches', (req: Request, res: Response) => {
//   matchesController.readAll(req, res);
// });

export default matchesRoute;
