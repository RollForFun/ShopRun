/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');
db.Shop = db.sequelize.import('../api/shop/shop.model');
db.Coupon = db.sequelize.import('../api/coupon/coupon.model');
db.Feed = db.sequelize.import('../api/feed/feed.model');

Object.keys(db).forEach(function(modelName) {
  if('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

export default db;
