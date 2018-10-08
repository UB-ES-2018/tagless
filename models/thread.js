'use strict';
module.exports = (sequelize, DataTypes) => {
  const Thread = sequelize.define('Thread', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Thread.associate = function(models) {
    // associations can be defined here
  };
  return Thread;
};