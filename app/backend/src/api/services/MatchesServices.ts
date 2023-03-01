import { ModelStatic } from 'sequelize';
import IServiceMatches from '../interfaces/IServiceMatches';
import Matches from '../../database/models/Matches.Model';
import Teams from '../../database/models/Teams.Model';

export default class MatchesService implements IServiceMatches {
  protected model: ModelStatic<Matches> = Matches;

  async readAll(): Promise<Matches[]> {
    const data = await this.model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return data;
  }

  async finishMatch(id: number): Promise<number> {
    const [data] = await this.model.update({ inProgress: false }, { where: { id } });
    return data;
  }
}
