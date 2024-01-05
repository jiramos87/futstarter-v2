'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const [playerItemRows] = await queryInterface.sequelize.query(
      `SELECT DISTINCT league, league_id, league_image_url FROM player_item`
    )

    const leagueRows = playerItemRows.map((playerItemRow) => {
      const { league, league_id, league_image_url } = playerItemRow

      return {
        name: league,
        id: league_id,
        image_url: league_image_url
      }
    })

    await queryInterface.createTable('league', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        unique: true,
        type: Sequelize.STRING,
        allowNull: false
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: true
      }
    })

    await queryInterface.bulkInsert('league', leagueRows)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('league')
  }
}
