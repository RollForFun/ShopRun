'use strict';

var app = require('../..');
import request from 'supertest';

var newUserCoupon;

describe('UserCoupon API:', function() {

  describe('GET /api/userCoupons', function() {
    var userCoupons;

    beforeEach(function(done) {
      request(app)
        .get('/api/userCoupons')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          userCoupons = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      userCoupons.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/userCoupons', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/userCoupons')
        .send({
          name: 'New UserCoupon',
          info: 'This is the brand new userCoupon!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newUserCoupon = res.body;
          done();
        });
    });

    it('should respond with the newly created userCoupon', function() {
      newUserCoupon.name.should.equal('New UserCoupon');
      newUserCoupon.info.should.equal('This is the brand new userCoupon!!!');
    });

  });

  describe('GET /api/userCoupons/:id', function() {
    var userCoupon;

    beforeEach(function(done) {
      request(app)
        .get('/api/userCoupons/' + newUserCoupon._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          userCoupon = res.body;
          done();
        });
    });

    afterEach(function() {
      userCoupon = {};
    });

    it('should respond with the requested userCoupon', function() {
      userCoupon.name.should.equal('New UserCoupon');
      userCoupon.info.should.equal('This is the brand new userCoupon!!!');
    });

  });

  describe('PUT /api/userCoupons/:id', function() {
    var updatedUserCoupon;

    beforeEach(function(done) {
      request(app)
        .put('/api/userCoupons/' + newUserCoupon._id)
        .send({
          name: 'Updated UserCoupon',
          info: 'This is the updated userCoupon!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedUserCoupon = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUserCoupon = {};
    });

    it('should respond with the updated userCoupon', function() {
      updatedUserCoupon.name.should.equal('Updated UserCoupon');
      updatedUserCoupon.info.should.equal('This is the updated userCoupon!!!');
    });

  });

  describe('DELETE /api/userCoupons/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/userCoupons/' + newUserCoupon._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when userCoupon does not exist', function(done) {
      request(app)
        .delete('/api/userCoupons/' + newUserCoupon._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
