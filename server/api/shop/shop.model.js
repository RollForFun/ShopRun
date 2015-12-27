'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Shop', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    shopName: DataTypes.STRING,
    shortDescription: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    delete: DataTypes.BOOLEAN,
    active: DataTypes.BOOLEAN
  });
}
