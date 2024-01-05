'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const [playerItemRows] = await queryInterface.sequelize.query(
      `SELECT DISTINCT nation, nation_id, nation_image_url FROM player_item`
    )

    const nationRows = playerItemRows.map((playerItemRow) => {
      const { nation, nation_id, nation_image_url } = playerItemRow

      return {
        name: nation,
        id: nation_id,
        image_url: nation_image_url
      }
    })

    await queryInterface.createTable('nation', {
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

    await queryInterface.bulkInsert('nation', nationRows)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('nation')
  }
};
