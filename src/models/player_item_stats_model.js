import Sequelize from 'sequelize'

export default (sequelize, DataTypes) => {
  return PlayerItemStats.init(sequelize, DataTypes)
}

class PlayerItemStats extends Sequelize.Model {
  static init (sequelize, DataTypes) {
    super.init({
      playerItemId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'player_item',
          key: 'id'
        },
        field: 'player_item_id'
      },
      acceleration: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      sprintSpeed: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'sprint_speed'
      },
      positioning: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      finishing: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      shotPower: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'shot_power'
      },
      longShots: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'long_shots'
      },
      volleys: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      penalties: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      vision: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      crossing: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      freeKickAccuracy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'free_kick_accuracy'
      },
      shortPassing: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'short_passing'
      },
      longPassing: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'long_passing'
      },
      curve: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      agility: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      reactions: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      ballControl: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'ball_control'
      },
      dribbling: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      composure: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      interceptions: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      headingAccuracy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'heading_accuracy'
      },
      defensiveAwareness: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'defensive_awareness'
      },
      standingTackle: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'standing_tackle'
      },
      slidingTackle: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'sliding_tackle'
      },
      jumping: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      stamina: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      strength: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      aggression: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'player_item_stats',
      schema: 'public',
      timestamps: false
    })
    return PlayerItemStats
  }

  static associate (models) {
    this.belongsTo(models.PlayerItem, {
      foreignKey: 'playerItemId',
      as: 'playerItem'
    })
  }
}
