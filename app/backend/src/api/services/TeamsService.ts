import { ModelStatic } from 'sequelize';
import Teams from '../../database/models/Teams.Model';
import IServiceTeams from '../interfaces/IServiceTeams';

export default class TeamsService implements IServiceTeams {
  protected model: ModelStatic<Teams> = Teams;

  async readAll(): Promise<Teams[]> {
    const result = await this.model.findAll();
    return result;
  }

  async readTeamById(id: number): Promise<Teams | null> {
    const team = await this.model.findByPk(id);
    if (!team) {
      return null;
    }
    return team;
  }
}
