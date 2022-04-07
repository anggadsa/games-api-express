'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_game_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({user_game}) {
      // define association here
      this.belongsTo(user_game, { foreignKey: 'user_id' })
    }
  }
  user_game_history.init({
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'user_game_history',
  });
  return user_game_history;
};

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   const user_game_history = sequelize.define('user_game_history', {
//     user_id: DataTypes.INTEGER,
//   }, {});

//   user_game_history.associate = function(models) {
//     user_game_history.belongsTo(models.user_game, {foreignKey: 'user_id', as: 'user_id'})
//   };
//   return user_game_history;
// };
