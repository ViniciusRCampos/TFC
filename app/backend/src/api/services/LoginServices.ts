import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import Users from '../../database/models/Users.Model';
import ILogin from '../interfaces/ILogin';
import IServiceLogin from '../interfaces/IServiceLogin';
import IUser from '../interfaces/IUsers';

export default class LoginServices implements IServiceLogin {
  protected model: ModelStatic<Users> = Users;

  async login({ email, password }: ILogin): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    const verifyPassword = bcrypt.compareSync(password, user.password);
    if (!verifyPassword) {
      return null;
    }

    return user.dataValues;
  }

  async findRoleUser(email: string): Promise<IUser | null> {
    const data = await this.model.findOne({ where: { email } });
    if (!data) { return null; }
    return data.dataValues;
  }
}
