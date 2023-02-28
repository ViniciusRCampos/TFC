import ILogin from './ILogin';
import IUser from './IUsers';

export default interface IServiceLogin{
  login(login: ILogin): Promise<IUser | null>

}
