import Sequelize from 'sequelize'

export default (sequelize, DataTypes) => {
  return User.init(sequelize, DataTypes)
}

class User extends Sequelize.Model {
  static init (sequelize, DataTypes) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'user',
      schema: 'public',
      timestamps: false
    })
    return User
  }
}
