// test-reviews.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const Review = require('../controllers/reviews');
const express = require("express");

chai.use(chaiHttp);

describe('Reviews', ()  => {

  // TEST INDEX
  it('should index ALL reviews on / GET', (done) => {
    chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(2002);
          res.should.be.html;
          done();
        });
  });

  // TEST NEW
  // TEST CREATE
  // TEST SHOW
  // TEST EDIT
  // TEST UPDATE
  // TEST DELETE
});
