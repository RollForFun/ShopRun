'use strict';

export default function(sequelize, DataTypes) {
  var Feed = sequelize.define('Feed', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    amount: DataTypes.INTEGER
  }, {
    timestamps: true
  });
  return Feed;
}
