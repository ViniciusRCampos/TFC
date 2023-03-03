import ILeaderboard from './ILeaderboard';

export default interface IServiceLeaderboard {
  board(path: string | null): Promise<ILeaderboard[] | null>
}
