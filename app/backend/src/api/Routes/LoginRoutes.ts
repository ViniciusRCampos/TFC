import { Request, Response, Router } from 'express';
import LoginController from '../controller/Login.Controller';
import LoginServices from '../services/LoginServices';

const loginRoute = Router();
const loginService = new LoginServices();
const loginController = new LoginController(loginService);

loginRoute.post('/login', (req: Request, res: Response) => {
  loginController.login(req, res);
});

export default loginRoute;
