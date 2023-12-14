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
        allowNull: false
      },
      sprintSpeed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'sprint_speed'
      },
      positioning: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      finishing: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      shotPower: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'shot_power'
      },
      longShots: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'long_shots'
      },
      volleys: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      penalties: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      vision: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      crossing: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      freeKickAccuracy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'free_kick_accuracy'
      },
      shortPassing: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'short_passing'
      },
      longPassing: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'long_passing'
      },
      curve: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      agility: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      reactions: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ballControl: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'ball_control'
      },
      dribbling: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      composure: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      interceptions: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      headingAccuracy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'heading_accuracy'
      },
      defensiveAwareness: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'defensive_awareness'
      },
      standingTackle: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'standing_tackle'
      },
      slidingTackle: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'sliding_tackle'
      },
      jumping: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      stamina: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      strength: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      aggression: {
        type: DataTypes.INTEGER,
        allowNull: false
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
