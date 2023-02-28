import { ModelStatic } from 'sequelize';
import Teams from '../../database/models/Teams.Model';
import { ID_NOT_FOUND } from '../errors/ErrorMessage';
import NotFoundError from '../errors/NotFoundError';
import IServiceTeams from '../interfaces/IServiceTeams';

export default class TeamsService implements IServiceTeams {
  protected model: ModelStatic<Teams> = Teams;

  async readAll(): Promise<Teams[]> {
    const result = await this.model.findAll();
    return result;
  }

  async readTeamById(id: number): Promise<Teams> {
    const team = await this.model.findByPk(id);
    if (!team) {
      throw new NotFoundError(ID_NOT_FOUND.message);
    }
    return team;
  }
}
