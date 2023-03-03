import { Op } from 'sequelize';
import sequelize = require('sequelize');
import Matches from '../../database/models/Matches.Model';
import ILeaderboard, { IDraws, IEfficiency, ILosses, IVictories } from '../interfaces/ILeaderboard';

async function victories(idTeam: number, teamName: string): Promise<IVictories> {
  const [victory] = await Matches.findAll({
    attributes: [
      [sequelize.fn('COUNT', sequelize.col('home_team_id')), 'totalVictories'],
      [sequelize.fn('SUM', sequelize.col('home_team_goals')), 'goalsFavor'],
      [sequelize.fn('SUM', sequelize.col('away_team_goals')), 'goalsOwn'],
    ],
    where: { homeTeamId: idTeam,
      inProgress: false,
      homeTeamGoals: {
        [Op.gt]: sequelize.col('away_team_goals'),
      } },
    group: 'home_team_id' });
  if (!victory) {
    return { name: teamName, totalVictories: 0, goalsFavor: 0, goalsOwn: 0 };
  }
  return { name: teamName, ...victory.dataValues };
}

async function losses(idTeam: number, teamName: string): Promise<ILosses> {
  const [loss] = await Matches.findAll({
    attributes: [
      [sequelize.fn('COUNT', sequelize.col('home_team_id')), 'totalLosses'],
      [sequelize.fn('SUM', sequelize.col('home_team_goals')), 'goalsFavor'],
      [sequelize.fn('SUM', sequelize.col('away_team_goals')), 'goalsOwn'],
    ],
    where: { homeTeamId: idTeam,
      inProgress: false,
      awayTeamGoals: {
        [Op.gt]: sequelize.col('home_team_goals'),
      } },
    group: 'home_team_id' });
  if (!loss) {
    return { name: teamName, totalLosses: 0, goalsFavor: 0, goalsOwn: 0 };
  }
  return { name: teamName, ...loss.dataValues };
}

async function draws(idTeam: number, teamName: string): Promise<IDraws> {
  const [draw] = await Matches.findAll({
    attributes: [
      [sequelize.fn('COUNT', sequelize.col('home_team_id')), 'totalDraws'],
      [sequelize.fn('SUM', sequelize.col('home_team_goals')), 'goalsFavor'],
      [sequelize.fn('SUM', sequelize.col('away_team_goals')), 'goalsOwn'],
    ],
    where: { homeTeamId: idTeam,
      inProgress: false,
      awayTeamGoals: {
        [Op.eq]: sequelize.col('home_team_goals'),
      } },
    group: 'home_team_id' });
  if (!draw) {
    return { name: teamName, totalDraws: 0, goalsFavor: 0, goalsOwn: 0 };
  }
  return { name: teamName, ...draw.dataValues };
}

function calculateEfficiency(Draws: IDraws, Losses: ILosses, Victories: IVictories):
IEfficiency {
  const points = (Draws.totalDraws * 1) + (Victories.totalVictories * 3);
  const games = (Victories.totalVictories + Losses.totalLosses + Draws.totalDraws);
  const goalsFavor = Number(Victories.goalsFavor)
  + Number(Losses.goalsFavor) + Number(Draws.goalsFavor);
  const goalsOwn = Number(Victories.goalsOwn)
  + Number(Losses.goalsOwn) + Number(Draws.goalsOwn);

  const efficiency = Number(((points / (games * 3)) * 100).toFixed(2));
  const goalsBalance = goalsFavor - goalsOwn;
  return { goalsBalance, efficiency, goalsOwn, goalsFavor };
}

export default async function homeData(idTeam: number, teamName: string): Promise<ILeaderboard> {
  const homeDraws = await draws(idTeam, teamName);
  const homeLosses = await losses(idTeam, teamName);
  const homeVictories = await victories(idTeam, teamName);
  const eff = calculateEfficiency(homeDraws, homeLosses, homeVictories);
  const home = {
    name: teamName,
    totalPoints: (homeVictories.totalVictories * 3) + (homeDraws.totalDraws * 1),
    totalGames: (homeVictories.totalVictories + homeLosses.totalLosses + homeDraws.totalDraws),
    totalVictories: homeVictories.totalVictories,
    totalLosses: homeLosses.totalLosses,
    totalDraws: homeDraws.totalDraws,
    goalsOwn: eff.goalsOwn,
    goalsFavor: eff.goalsFavor,
    goalsBalance: eff.goalsBalance,
    efficiency: eff.efficiency,
  };
  return home;
}
