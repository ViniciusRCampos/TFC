import ILeaderboard from './ILeaderboard';

export default interface IServiceLeaderboard {
  board(): Promise<ILeaderboard[] | null>
}
