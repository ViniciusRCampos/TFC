import { ModelStatic } from 'sequelize';
import IServiceMatches from '../interfaces/IServiceMatches';
import Matches from '../../database/models/Matches.Model';
import Teams from '../../database/models/Teams.Model';
import IMatches from '../interfaces/IMatches';

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

  async updateMatch(id: number, homeGoals: number, awayGoals: number): Promise<number> {
    const [data] = await this.model.update(
      { homeTeamGoals: homeGoals, awayTeamGoals: awayGoals },
      { where: { id } },
    );
    return data;
  }

  async insertMatch(match: IMatches): Promise<IMatches> {
    const data = await this.model.create({ ...match });
    return data;
  }
}
