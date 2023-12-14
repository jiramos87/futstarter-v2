'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('player_item_stats', {
      player_item_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'player_item',
          key: 'id'
        }
      },
      acceleration: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sprint_speed: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      positioning: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      finishing: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      shot_power: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      long_shots: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      volleys: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      penalties: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      vision: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      crossing: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      free_kick_accuracy: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      short_passing: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      long_passing: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      curve: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      agility: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      balance: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      reactions: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ball_control: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      dribbling: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      composure: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      interceptions: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      heading_accuracy: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      defensive_awareness: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      standing_tackle: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sliding_tackle: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      jumping: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      stamina: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      strength: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      aggression: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('player_item_stats')
  }
}
