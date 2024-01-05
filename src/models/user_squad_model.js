import Sequelize from 'sequelize'

export default (sequelize, DataTypes) => {
  return UserSquad.init(sequelize, DataTypes)
}

class UserSquad extends Sequelize.Model {
  static init (sequelize, DataTypes) {
    super.init({
      squadId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'squad',
          key: 'id'
        },
        field: 'squad_id'
      },
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        },
        field: 'user_id'
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'user_squad',
      schema: 'public',
      timestamps: false
    })
    return UserSquad
  }

  static associate (models) {
    this.hasOne(models.Squad, {
      foreignKey: 'id',
      as: 'squad'
    })
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    })
  }
}