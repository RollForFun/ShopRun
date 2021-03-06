/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/userCoupons              ->  index
 * POST    /api/userCoupons              ->  create
 * GET     /api/userCoupons/:id          ->  show
 * PUT     /api/userCoupons/:id          ->  update
 * DELETE  /api/userCoupons/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var sqldb = require('../../sqldb');
var UserCoupon = sqldb.UserCoupon;

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of UserCoupons
export function index(req, res) {
  UserCoupon.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single UserCoupon from the DB
export function show(req, res) {
  UserCoupon.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new UserCoupon in the DB
export function create(req, res) {
  UserCoupon.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing UserCoupon in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  UserCoupon.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a UserCoupon from the DB
export function destroy(req, res) {
  UserCoupon.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
