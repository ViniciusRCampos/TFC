import Matches from '../../database/models/Matches.Model';

export default interface IServiceMatches {
  readAll(): Promise<Matches[]>
}
