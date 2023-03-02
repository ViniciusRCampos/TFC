import { Op } from 'sequelize';
import sequelize = require('sequelize');
import Matches from '../../database/models/Matches.Model';
import ILeaderboard, { IDraws, ILosses, IVictories } from '../interfaces/ILeaderboard';

async function victories(idTeam: number, teamName: string): Promise<IVictories> {
  const [victory] = await Matches.findAll({
    attributes: [
      [sequelize.fn('COUNT', sequelize.col('away_team_id')), 'totalVictories'],
      [sequelize.fn('SUM', sequelize.col('home_team_goals')), 'goalsFavor'],
      [sequelize.fn('SUM', sequelize.col('away_team_goals')), 'goalsOwn'],
    ],
    where: { homeTeamId: idTeam,
      inProgress: false,
      awayTeamGoals: {
        [Op.gt]: sequelize.col('home_team_goals'),
      } },
    group: 'away_team_id' });
  if (!victory) {
    return { name: teamName, totalVictories: 0, goalsFavor: 0, goalsOwn: 0 };
  }
  return { name: teamName, ...victory.dataValues };
}

async function losses(idTeam: number, teamName: string): Promise<ILosses> {
  const [loss] = await Matches.findAll({
    attributes: [
      [sequelize.fn('COUNT', sequelize.col('away_team_id')), 'totalLosses'],
      [sequelize.fn('SUM', sequelize.col('home_team_goals')), 'goalsFavor'],
      [sequelize.fn('SUM', sequelize.col('away_team_goals')), 'goalsOwn'],
    ],
    where: { homeTeamId: idTeam,
      inProgress: false,
      homeTeamGoals: {
        [Op.gt]: sequelize.col('away_team_goals'),
      } },
    group: 'away_team_id' });
  if (!loss) {
    return { name: teamName, totalLosses: 0, goalsFavor: 0, goalsOwn: 0 };
  }
  return { name: teamName, ...loss.dataValues };
}

async function draws(idTeam: number, teamName: string): Promise<IDraws> {
  const [draw] = await Matches.findAll({
    attributes: [
      [sequelize.fn('COUNT', sequelize.col('away_team_id')), 'totalDraws'],
      [sequelize.fn('SUM', sequelize.col('home_team_goals')), 'goalsFavor'],
      [sequelize.fn('SUM', sequelize.col('away_team_goals')), 'goalsOwn'],
    ],
    where: { homeTeamId: idTeam,
      inProgress: false,
      awayTeamGoals: {
        [Op.eq]: sequelize.col('home_team_goals'),
      } },
    group: 'away_team_id' });
  if (!draw) {
    return { name: teamName, totalDraws: 0, goalsFavor: 0, goalsOwn: 0 };
  }
  return { name: teamName, ...draw.dataValues };
}

export default async function awayData(idTeam: number, teamName: string): Promise<ILeaderboard> {
  const awayDraws = await draws(idTeam, teamName);
  const awayLosses = await losses(idTeam, teamName);
  const awayVictories = await victories(idTeam, teamName);

  const away = {
    name: teamName,
    totalPoints: (awayVictories.totalVictories * 3) + (awayDraws.totalDraws * 1),
    totalGames: (awayVictories.totalVictories + awayLosses.totalLosses + awayDraws.totalDraws),
    totalVictories: awayVictories.totalVictories,
    totalLosses: awayLosses.totalLosses,
    totalDraws: awayDraws.totalDraws,
    goalsOwn: Number(awayVictories.goalsOwn)
    + Number(awayLosses.goalsOwn) + Number(awayDraws.goalsOwn),
    goalsFavor: Number(awayVictories.goalsFavor)
    + Number(awayLosses.goalsFavor) + Number(awayDraws.goalsFavor),
  };
  return away;
}
