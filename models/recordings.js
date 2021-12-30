'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recordings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Recordings.init({
    name: DataTypes.STRING,
    blob_file: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'Recordings',
  });
  return Recordings;
};