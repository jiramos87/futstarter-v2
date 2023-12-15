import Sequelize from 'sequelize'

export default (sequelize, DataTypes) => {
  return Squad.init(sequelize, DataTypes)
}

class Squad extends Sequelize.Model {
  static init (sequelize, DataTypes) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      labels: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      formation: {
        type: DataTypes.STRING,
        allowNull: true
      },
      players: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        field: 'updated_at'
      }
    }, {
      sequelize,
      tableName: 'squad',
      schema: 'public',
      timestamps: false
    })
    return Squad
  }

  static associate (models) {
    this.belongsTo(models.UserSquad, {
      foreignKey: 'id',
      as: 'userSquad'
    })
  }
}