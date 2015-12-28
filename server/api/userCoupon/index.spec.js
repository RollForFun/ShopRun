'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var userCouponCtrlStub = {
  index: 'userCouponCtrl.index',
  show: 'userCouponCtrl.show',
  create: 'userCouponCtrl.create',
  update: 'userCouponCtrl.update',
  destroy: 'userCouponCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var userCouponIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './userCoupon.controller': userCouponCtrlStub
});

describe('UserCoupon API Router:', function() {

  it('should return an express router instance', function() {
    userCouponIndex.should.equal(routerStub);
  });

  describe('GET /api/userCoupons', function() {

    it('should route to userCoupon.controller.index', function() {
      routerStub.get
        .withArgs('/', 'userCouponCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/userCoupons/:id', function() {

    it('should route to userCoupon.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'userCouponCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/userCoupons', function() {

    it('should route to userCoupon.controller.create', function() {
      routerStub.post
        .withArgs('/', 'userCouponCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/userCoupons/:id', function() {

    it('should route to userCoupon.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'userCouponCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/userCoupons/:id', function() {

    it('should route to userCoupon.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'userCouponCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/userCoupons/:id', function() {

    it('should route to userCoupon.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'userCouponCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
