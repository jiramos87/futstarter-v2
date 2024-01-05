'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('player_item', 'nation_id', {
      type: Sequelize.INTEGER,
      allowNull: true
    })

    await queryInterface.addColumn('player_item', 'club_id', {
      type: Sequelize.INTEGER,
      allowNull: true
    })

    await queryInterface.addColumn('player_item', 'league_id', {
      type: Sequelize.INTEGER,
      allowNull: true
    })

    await queryInterface.addColumn('player_item', 'playstyle_plus_id', {
      type: Sequelize.STRING,
      allowNull: true
    })

    await queryInterface.addColumn('player_item', 'nation_image_url', {
      type: Sequelize.STRING,
      allowNull: true
    })

    await queryInterface.addColumn('player_item', 'club_image_url', {
      type: Sequelize.STRING,
      allowNull: true
    })

    await queryInterface.addColumn('player_item', 'league_image_url', {
      type: Sequelize.STRING,
      allowNull: true
    })

    await queryInterface.addColumn('player_item', 'playstyle_plus_image_url', {
      type: Sequelize.STRING,
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('player_item', 'nation_id')
    await queryInterface.removeColumn('player_item', 'club_id')
    await queryInterface.removeColumn('player_item', 'league_id')
    await queryInterface.removeColumn('player_item', 'nation_image_url')
    await queryInterface.removeColumn('player_item', 'club_image_url')
    await queryInterface.removeColumn('player_item', 'league_image_url')
    await queryInterface.removeColumn('player_item', 'playstyle_plus_id')
    await queryInterface.removeColumn('player_item', 'playstyle_plus_image_url')
  }
}
