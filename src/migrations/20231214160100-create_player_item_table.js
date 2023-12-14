'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('player_item', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      club: {
        type: Sequelize.STRING,
        allowNull: false
      },
      league: {
        type: Sequelize.STRING,
        allowNull: false
      },
      version: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      price: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price_change: {
        type: Sequelize.STRING,
        allowNull: false
      },
      accel_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      main_position: {
        type: Sequelize.STRING,
        allowNull: false
      },
      secondary_positions: {
        type: Sequelize.STRING,
        allowNull: true
      },
      attack_work_rate: {
        type: Sequelize.STRING,
        allowNull: false
      },
      defense_work_rate: {
        type: Sequelize.STRING,
        allowNull: false
      },
      PAC: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      SHO: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      PAS: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      DRI: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      DEF: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      PHY: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      weak_foot: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      skill_moves: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      height: {
        type: Sequelize.STRING,
        allowNull: true
      },
      weight: {
        type: Sequelize.STRING,
        allowNull: true
      },
      body_type: {
        type: Sequelize.STRING,
        allowNull: true
      },
      popularity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      total_base_stats: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      total_in_game_stats: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('player_item')
  }
}
