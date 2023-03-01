import { Request, Response, Router } from 'express';
import MatchesController from '../controller/Matches.Controller';
import matchValidation from '../Middlewares/MatchValidation';
import verifyToken from '../Middlewares/TokenValidation';
import MatchesService from '../services/MatchesServices';

const matchesRoute = Router();
const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchesRoute.get('/matches', (req: Request, res: Response) => {
  matchesController.readAll(req, res);
});

matchesRoute.patch('/matches/:id/finish', verifyToken, (req: Request, res: Response) => {
  matchesController.finishMatch(req, res);
});

matchesRoute.patch('/matches/:id', verifyToken, (req: Request, res: Response) => {
  matchesController.updateMatch(req, res);
});
matchesRoute.post('/matches', matchValidation, verifyToken, (req: Request, res: Response) => {
  matchesController.insertMatch(req, res);
});
export default matchesRoute;
