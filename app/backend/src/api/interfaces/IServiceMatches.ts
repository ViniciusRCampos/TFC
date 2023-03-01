import Matches from '../../database/models/Matches.Model';
import IMatches from './IMatches';

export default interface IServiceMatches {
  readAll(): Promise<Matches[]>
  finishMatch(id: number): Promise<number>
  updateMatch(id: number, homeGoals: number, awayGoals: number): Promise<number>
  insertMatch(match: IMatches): Promise<IMatches>
}
