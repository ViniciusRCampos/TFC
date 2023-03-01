import Matches from '../../database/models/Matches.Model';

export default interface IServiceMatches {
  readAll(): Promise<Matches[]>
  finishMatch(id: number): Promise<number>
}
