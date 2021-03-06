import chai from 'chai';
import 'chai/register-should';
import chaiHttp from 'chai-http';
import dirtyChai from 'dirty-chai';
// import pool from '../../server/db/config';

import app from '../../server/app';
import { seedData, populateTables, populateUsersTable } from '../seed/seed';

chai.use(chaiHttp);
chai.use(dirtyChai);

beforeEach(populateTables);

describe('POST /auth/signup', () => {
  it('should signup a valid user successfully', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(seedData.users.validUser)
      .end((err, res) => {
        if (err) done(err);

        res.status.should.eql(201);
        res.body.should.be.an('object').that.has.keys(['status', 'message', 'user']);
        res.body.status.should.eql('success');
        res.body.user.should.have.keys(['id', 'name', 'email']);
        res.body.user.name.should.eql(seedData.users.validUser.name);
        res.body.user.email.should.eql(seedData.users.validUser.email);
        done();
      });
  });

  it('should not signup a user with no name', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(seedData.users.invalidUserNoName)
      .end((err, res) => {
        if (err) done(err);

        res.status.should.eql(400);
        res.body.should.have.keys(['status', 'message']);
        res.body.should.not.have.keys(['user']);
        done();
      });
  });

  it('should not signup a user with no email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(seedData.users.invalidUserNoEmail)
      .end((err, res) => {
        if (err) done(err);

        res.status.should.eql(400);
        res.body.should.have.keys(['status', 'message']);
        res.body.should.not.have.keys(['user']);
        done();
      });
  });

  it('should not signup a user with no password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(seedData.users.invalidUserNoPass)
      .end((err, res) => {
        if (err) done(err);

        res.status.should.eql(400);
        res.body.should.have.keys(['status', 'message']);
        res.body.should.not.have.keys(['user']);
        done();
      });
  });

  it('should not signup a user with missmatching passwords', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(seedData.users.invalidUserPassMissMatch)
      .end((err, res) => {
        if (err) done(err);

        res.status.should.eql(400);
        res.body.should.have.keys(['status', 'message']);
        res.body.should.not.have.keys(['user']);
        res.body.message.should.eql('provided passwords donot match');
        done();
      });
  });
});

describe('POST /auth/login', () => {
  beforeEach(populateUsersTable);

  it('should sign an existing user in', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(seedData.users.validUser)
      .end((err, res) => {
        if (err) done(err);

        res.status.should.eql(200);
        res.body.should.be.an('object').which.has.keys(['status', 'message', 'auth_token']);
        done();
      });
  });

  it('should respond with a 400 if required fields are missing', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(seedData.users.invalidUserNoData)
      .end((err, res) => {
        if (err) done(err);

        res.status.should.eql(400);
        done();
      });
  });

  it('should not sign user in if invalid email or password is provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(seedData.users.invalidUser)
      .end((err, res) => {
        if (err) done(err);

        res.status.should.eql(400);
        res.body.should.not.have.keys(['auth_token']);
        done();
      });
  });

  it('should not sign in user with improper input format', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'invalid@email', password: 'well?' })
      .end((err, res) => {
        if (err) done(err);

        res.status.should.eql(400);
        res.body.should.not.have.keys(['auth_token']);
        done();
      });
  });
});
