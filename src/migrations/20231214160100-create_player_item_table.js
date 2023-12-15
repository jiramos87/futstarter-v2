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
        allowNull: true
      },
      club: {
        type: Sequelize.STRING,
        allowNull: true
      },
      league: {
        type: Sequelize.STRING,
        allowNull: true
      },
      version: {
        type: Sequelize.STRING,
        allowNull: true
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      price: {
        type: Sequelize.STRING,
        allowNull: true
      },
      price_change: {
        type: Sequelize.STRING,
        allowNull: true
      },
      accel_type: {
        type: Sequelize.STRING,
        allowNull: true
      },
      main_position: {
        type: Sequelize.STRING,
        allowNull: true
      },
      secondary_positions: {
        type: Sequelize.STRING,
        allowNull: true
      },
      attack_work_rate: {
        type: Sequelize.STRING,
        allowNull: true
      },
      defense_work_rate: {
        type: Sequelize.STRING,
        allowNull: true
      },
      PAC: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      SHO: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      PAS: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      DRI: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      DEF: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      PHY: {
        type: Sequelize.INTEGER,
        allowNull: true
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
        allowNull: true
      },
      total_base_stats: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      total_in_game_stats: {
        type: Sequelize.INTEGER,
        allowNull: true
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
