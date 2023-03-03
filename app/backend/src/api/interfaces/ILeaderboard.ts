interface IGoals {
  goalsFavor: number,
  goalsOwn: number,
}

export interface IDraws extends IGoals{
  name: string,
  totalDraws: number,
}
export interface IVictories extends IGoals{
  name: string,
  totalVictories: number,
}
export interface ILosses extends IGoals{
  name: string,
  totalLosses: number,
}

export interface IEfficiency extends IGoals{
  goalsBalance: number,
  efficiency: number,
}

export default interface ILeaderboard extends IEfficiency{
  name: string,
  totalPoints: number,
  totalGames: number,
  totalLosses: number,
  totalVictories: number,
  totalDraws: number,
}
