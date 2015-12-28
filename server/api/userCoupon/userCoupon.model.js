'use strict';

export default function(sequelize, DataTypes) {
  var UserCoupon = sequelize.define('UserCoupon', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    isUsed: DataTypes.BOOLEAN
  },{
    classMethods: {
      associate: function(models) {
        UserCoupon.belongsTo(models.User);
        UserCoupon.belongsTo(models.Coupon);
      }
    }
  });
  return UserCoupon;
}
