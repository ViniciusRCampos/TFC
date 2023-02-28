import { ModelStatic } from 'sequelize';
import Teams from '../../database/models/Teams.Model';
import IServiceTeams from '../interfaces/IServiceTeams';

export default class TeamsService implements IServiceTeams {
  protected model: ModelStatic<Teams> = Teams;

  async readAll(): Promise<Teams[]> {
    const result = await this.model.findAll();
    return result;
  }
}
