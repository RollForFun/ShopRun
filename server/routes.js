/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {

  // Insert routes below
  app.use('/api/userCoupons', require('./api/userCoupon'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/shops', require('./api/shop'));
  app.use('/api/coupons', require('./api/coupon'));
  app.use('/api/feeds', require('./api/feed'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
