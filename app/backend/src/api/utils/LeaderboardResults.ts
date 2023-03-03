import ILeaderboard from '../interfaces/ILeaderboard';
import homeData from './HomeLeaderboard';
import awayData from './AwayLeaderboard';

const result = (home: ILeaderboard, away: ILeaderboard) => {
  const data = {
    name: home.name,
    totalPoints: home.totalPoints + away.totalPoints,
    totalGames: home.totalGames + away.totalGames,
    totalVictories: home.totalVictories + away.totalVictories,
    totalDraws: home.totalDraws + away.totalDraws,
    totalLosses: home.totalLosses + away.totalLosses,
    goalsFavor: home.goalsFavor + away.goalsFavor,
    goalsOwn: away.goalsOwn + home.goalsOwn,
    goalsBalance: home.goalsBalance + away.goalsBalance,
    efficiency: Number((((home.totalPoints + away.totalPoints)
            / ((home.totalGames + away.totalGames) * 3)) * 100
    ).toFixed(2)),
  };
  return data;
};

export default async function calculateBoard(id: number, teamName: string, filter: string | null)
  : Promise<ILeaderboard> {
  const home = await homeData(id, teamName);
  if (filter === 'home') return home;
  const away = await awayData(id, teamName);
  if (filter === 'away') return away;
  const data = result(home, away);
  return data;
}
