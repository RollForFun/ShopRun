/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
var Thing = sqldb.Thing;
var User = sqldb.User;
var Shop = sqldb.Shop;
var Coupon = sqldb.Coupon;
var Feed = sqldb.Feed;

sqldb.sequelize.sync()
  .then(() => {
    return Thing.destroy({ where: {} });
  })
  .then(() => {
    return Shop.destroy({ where: {} });
  })
  .then(() => {
    return Coupon.destroy({ where: {} });
  })
  .then(() => {
    return Feed.destroy({ where: {} });
  })
  .then(() => {
    return Thing.bulkCreate([{
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    }]);
  })
  .then(() => {
    return Shop.create({
      _id: 1,
      shopName: 'Ecco',
      shortDescription: 'Ecco is the best shoes\' store in Canada',
      imageUrl: 'test url (add later)',
      delete: false,
      active: true
    });
  })
  .then(() => {
    return Coupon.bulkCreate([{
      ShopId: 1,
      couponCode: 'slj34u09239ujfsl93843242',
      shortDescription: 'short description for coupon',
      imageUrl: 'image url',
      startValidDate: '2015-12-27',
      endValidDate: '2016-1-27',
      createdAt: '2015-12-27',
      updatedAt: '2015-12-27',
      delete: false,
      active: true
    }]);
  })
  .then(() => {
    console.log('finished populating shops');
  })
  .then(() => {
    return Feed.create({
      _id: 1,
      amount: 1
    });
  })
  .then(() => {
    console.log('finished populating feeds');
  });

User.sync()
  .then(() => User.destroy({ where: {} }))
  .then(() => {
    return User.bulkCreate([{
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    }])
    .then(() => {
      console.log('finished populating users');
    });
  });
