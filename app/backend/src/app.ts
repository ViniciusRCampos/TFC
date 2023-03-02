import * as express from 'express';
import loginRoute from './api/Routes/LoginRoutes';
import matchesRoute from './api/Routes/MatchesRoutes';
import teamsRoute from './api/Routes/TeamsRoutes';
import leaderboardRoute from './api/Routes/LeaderboardRoutes';
// Vinicius Campos

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use(teamsRoute);
    this.app.use(loginRoute);
    this.app.use(matchesRoute);
    this.app.use(leaderboardRoute);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
