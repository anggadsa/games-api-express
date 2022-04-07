'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_game_histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {         // User belongsTo user_gameId 1:1
          model: 'user_games',
          key: 'id'
        }
      },
      loginAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      logoutAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_game_histories');
  }
};

// references: {         // User belongsTo user_gameId 1:1
//   model: 'user_games',
//   key: 'id'
// }