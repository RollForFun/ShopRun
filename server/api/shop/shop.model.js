'use strict';

export default function(sequelize, DataTypes) {
  var Shop = sequelize.define('Shop', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    shopName: DataTypes.STRING,
    shortDescription: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    delete: DataTypes.BOOLEAN,
    active: DataTypes.BOOLEAN
  },{
    timestamps: true,
    classMethods: {
      associate: function(models) {
        Shop.hasMany(models.Coupon);
        Shop.belongsToMany(models.User, {'through': models.Feed});
      }
    }
  });
  return Shop;
}
