import { BOOLEAN, Model, INTEGER } from 'sequelize';
import Team from './Teams.Model';
import db from '.';

class Match extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress : boolean;
}

Match.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  homeTeamId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: Team,
      key: 'id',
    },
  },

  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },

  awayTeamId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: Team,
      key: 'id',
    },
  },

  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },

  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },

}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Match.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeam' });

Match.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeam' });

Team.hasMany(Match, { foreignKey: 'id', as: 'homeMatches' });

Team.hasMany(Match, { foreignKey: 'id', as: 'awayMatches' });

export default Match;
