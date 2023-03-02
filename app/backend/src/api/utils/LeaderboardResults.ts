import ILeaderboard from '../interfaces/ILeaderboard';
import homeData from './HomeLeaderboard';
import awayData from './AwayLeaderboard';

// const leaderboardInfo = {
//   name: '',
//   totalPoints: 0,
//   totalGames: 0,
//   totalVictories: 0,
//   totalDraws: 0,
//   totalLosses: 0,
//   goalsFavor: 0,
//   goalsOwn: 0,
// };

// const reset = () => {
//   leaderboardInfo.totalPoints = 0;
//   leaderboardInfo.totalGames = 0;
//   leaderboardInfo.totalVictories = 0;
//   leaderboardInfo.totalDraws = 0;
//   leaderboardInfo.totalLosses = 0;
//   leaderboardInfo.goalsFavor = 0;
//   leaderboardInfo.goalsOwn = 0;
// };

const result = (home: ILeaderboard, away: ILeaderboard) => {
  const data = {
    name: home.name,
    totalPoints: home.totalPoints + away.totalPoints,
    totalGames: home.totalGames + away.totalGames,
    totalVictories: home.totalVictories + away.totalVictories,
    totalDraws: home.totalDraws + away.totalDraws,
    totalLosses: home.totalLosses + away.totalLosses,
    goalsFavor: home.goalsFavor + away.goalsOwn,
    goalsOwn: away.goalsFavor + home.goalsOwn,
  };

  return data;
};

export default async function calculateBoard(id: number, teamName: string)
  : Promise<ILeaderboard> {
  const home = await homeData(id, teamName);
  const away = await awayData(id, teamName);
  const data = result(home, away);
  return data;
}
