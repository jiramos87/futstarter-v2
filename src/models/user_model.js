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
        primaryKey: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'first_name'
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'last_name'
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'user_name'
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
        field: 'created_at'
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
