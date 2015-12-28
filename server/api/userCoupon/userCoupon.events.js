/**
 * UserCoupon model events
 */

'use strict';

import {EventEmitter} from 'events';
var UserCoupon = require('../../sqldb').UserCoupon;
var UserCouponEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
UserCouponEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  UserCoupon.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    UserCouponEvents.emit(event + ':' + doc._id, doc);
    UserCouponEvents.emit(event, doc);
    done(null);
  }
}

export default UserCouponEvents;
