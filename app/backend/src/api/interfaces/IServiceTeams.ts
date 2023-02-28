import Teams from '../../database/models/Teams.Model';

export default interface IServiceTeams{
  readAll(): Promise<Teams[]>
  readTeamById(id: number): Promise<Teams>
}
