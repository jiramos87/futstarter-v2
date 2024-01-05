'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('user_squad', 'active', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    })

    const [userSquads] = await queryInterface.sequelize.query(
      `SELECT * FROM user_squad`
    )

    const userSquadPromises = userSquads.map(async userSquad => {
      await queryInterface.sequelize.query(
        `UPDATE user_squad SET active = true WHERE squad_id = ${userSquad.squad_id} AND user_id = ${userSquad.user_id}`
      )
    })

    await Promise.all(userSquadPromises)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('user_squad', 'active')
  }
}
