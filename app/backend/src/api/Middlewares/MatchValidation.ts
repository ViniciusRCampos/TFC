import { Request, Response, NextFunction } from 'express';
import { MATCH_ENTITY_ERROR, TEAM_ID_NOT_FOUND } from '../errors/ErrorMessage';
import TeamsService from '../services/TeamsService';

async function verifyIdTeam(idTeam: number) {
  const team = new TeamsService();
  const data = await team.readTeamById(idTeam);
  return data;
}

export default async function matchValidation(req: Request, res: Response, next: NextFunction) {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    return res.status(MATCH_ENTITY_ERROR.status).json({ message: MATCH_ENTITY_ERROR.message });
  }
  const homeId = await verifyIdTeam(homeTeamId);
  const awayId = await verifyIdTeam(awayTeamId);
  if (!homeId || !awayId) {
    return res.status(TEAM_ID_NOT_FOUND.status).json({ message: TEAM_ID_NOT_FOUND.message });
  }
  next();
}
