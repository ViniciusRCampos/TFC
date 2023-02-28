import { Request, Response, Router } from 'express';
import TeamsController from '../controller/Teams.Controller';
import TeamsService from '../services/TeamsService';

const teamsRoute = Router();
const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

teamsRoute.get('/teams', (req: Request, res: Response) => {
  teamsController.readAll(req, res);
});

export default teamsRoute;
