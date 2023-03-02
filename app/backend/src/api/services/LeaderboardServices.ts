import Teams from '../../database/models/Teams.Model';
import ILeaderboard from '../interfaces/ILeaderboard';
import calculateBoard from '../utils/LeaderboardResults';

export default class LeaderboardService {
  static async board(): Promise<ILeaderboard[] | null> {
    const teams = await Teams.findAll();
    const teamResults: ILeaderboard[] = [];
    if (!teams) {
      return null;
    }
    const data = teams.map(async (team) => {
      const teamData = await calculateBoard(team.dataValues.id, team.dataValues.teamName);
      teamResults.push(teamData);
    });
    await Promise.all(data);
    return teamResults;
  }
}
