'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class user_game_biodata extends Model {
    static associate({user_game}) {
      // define association here
      this.belongsTo(user_game, { foreignKey: 'user_id' })
    }
  }

  user_game_biodata.init({
    fullName: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    role: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_game_biodata',
  });
  return user_game_biodata;
};

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class user_game_biodata extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   user_game_biodata.init({
//     fullName: DataTypes.STRING,
//     age: DataTypes.INTEGER,
//     gender: DataTypes.STRING,
//     country: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'user_game_biodata',
//   });
//   return user_game_biodata;
// };


// const user_game_biodata = sequelize.define('user_game_biodata', {
//     fullName: DataTypes.STRING,
//     age: DataTypes.INTEGER,
//     gender: DataTypes.STRING,
//     role: DataTypes.STRING,
//     user_id: DataTypes.INTEGER
//   }, {});

//   user_game_biodata.associate = function(models) {
//     user_game_biodata.belongsTo(models.user_game, {foreignKey: 'user_id', as: 'user_id'})
//   };

//   return user_game_biodata;
// };