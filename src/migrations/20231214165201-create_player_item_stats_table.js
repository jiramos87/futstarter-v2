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
        allowNull: true
      },
      sprint_speed: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      positioning: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      finishing: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      shot_power: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      long_shots: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      volleys: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      penalties: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      vision: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      crossing: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      free_kick_accuracy: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      short_passing: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      long_passing: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      curve: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      agility: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      balance: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      reactions: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      ball_control: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      dribbling: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      composure: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      interceptions: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      heading_accuracy: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      defensive_awareness: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      standing_tackle: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      sliding_tackle: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      jumping: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      stamina: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      strength: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      aggression: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('player_item_stats')
  }
}
