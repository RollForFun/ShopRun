'use strict';

export default function(sequelize, DataTypes) {
  var Coupon = sequelize.define('Coupon', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    couponCode: DataTypes.STRING,
    shortDescription: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    startValidDate: DataTypes.DATE,
    endValidDate: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    delete: DataTypes.BOOLEAN,
    active: DataTypes.BOOLEAN
  },{
    classMethods: {
      associate: function(models) {
        Coupon.belongsTo(models.Shop);
      }
    }
  });
  return Coupon;
}
