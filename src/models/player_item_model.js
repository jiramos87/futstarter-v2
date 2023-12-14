import Sequelize from 'sequelize'

export default (sequelize, DataTypes) => {
  return PlayerItem.init(sequelize, DataTypes)
}

class PlayerItem extends Sequelize.Model {
  static init (sequelize, DataTypes) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      club: {
        type: DataTypes.STRING,
        allowNull: false
      },
      league: {
        type: DataTypes.STRING,
        allowNull: false
      },
      version: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false
      },
      priceChange: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'price_change'
      },
      accelType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'accel_type'
      },
      mainPosition: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'main_position'
      },
      secondaryPositions: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'secondary_positions'
      },
      attackWorkRate: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'attack_work_rate'
      },
      defenseWorkRate: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'defense_work_rate'
      },
      weakFoot: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'weak_foot'
      },
      skillMoves: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'skill_moves'
      },
      height: {
        type: DataTypes.STRING,
        allowNull: true
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: true
      },
      bodyType: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'body_type'
      },
      PAC: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      SHO: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      PAS: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      DRI: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      DEF: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      PHY: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      popularity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      totalBaseStats: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'total_base_stats'
      },
      totalInGameStats: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'total_in_game_stats'
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('now'),
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('now'),
        field: 'updated_at'
      }
    }, {
      sequelize,
      tableName: 'player_item',
      schema: 'public',
      timestamps: false
    })
    return PlayerItem
  }

  static associate (models) {
    this.hasOne(models.PlayerItemStats, {
      foreignKey: 'playerItemId',
      as: 'stats'
    })
  }
}
