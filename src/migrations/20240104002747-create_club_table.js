'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const [playerItemRows] = await queryInterface.sequelize.query(
      `SELECT DISTINCT club, club_id, club_image_url FROM player_item`
    )

    const clubRows = playerItemRows.map((playerItemRow) => {
      const { club, club_id, club_image_url } = playerItemRow

      return {
        name: club,
        id: club_id,
        image_url: club_image_url
      }
    })

    await queryInterface.createTable('club', {
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

    await queryInterface.bulkInsert('club', clubRows)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('club')
  }
}
