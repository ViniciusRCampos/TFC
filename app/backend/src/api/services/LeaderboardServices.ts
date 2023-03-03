import { ModelStatic } from 'sequelize';
import Teams from '../../database/models/Teams.Model';
import ILeaderboard from '../interfaces/ILeaderboard';
import calculateBoard from '../utils/LeaderboardResults';

export default class LeaderboardService {
  protected model: ModelStatic<Teams> = Teams;

  async board(path: string | null): Promise<ILeaderboard[] | null> {
    const teams = await this.model.findAll();
    const teamResults: ILeaderboard[] = [];
    if (!teams) {
      return null;
    }
    const data = teams.map(async (team) => {
      const teamData = await calculateBoard(team.dataValues.id, team.dataValues.teamName, path);
      teamResults.push(teamData);
    });
    await Promise.all(data);
    const ordered = teamResults
      .sort((teamA, teamB) => (teamB.totalPoints) - (teamA.totalPoints)
    || (teamB.totalVictories) - (teamA.totalVictories)
    || (teamB.goalsBalance) - (teamA.goalsBalance)
    || (teamB.goalsFavor) - (teamA.goalsFavor)
    || (teamB.goalsOwn) - (teamA.goalsOwn));
    return ordered;
  }
}
