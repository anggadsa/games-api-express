'use strict';
const userData = require(`../masterdata/user_data.json`);

module.exports = {
  async up (queryInterface, Sequelize) {
    const userDataWihoutId = userData.map((eachUserData) => {
      delete eachUserData.id;
      eachUserData.createdAt = new Date()
      eachUserData.updatedAt = new Date()
      return eachUserData;
    });

    await queryInterface.bulkInsert('user_games', userDataWihoutId);
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('user_games', null);
  }
};
