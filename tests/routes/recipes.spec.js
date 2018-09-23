const chai = require('chai');
require('chai/register-should');
const chaiHttp = require('chai-http');
const dirtyChai = require('dirty-chai');

const app = require('./../../app.js');
const { populateTables } = require('../seed/seed');

chai.use(chaiHttp);
chai.use(dirtyChai);

beforeEach(populateTables);

describe('GET /recipes', () => {
  it('should return an array of existing recipes', (done) => {
    chai.request(app)
      .get('/api/v1/recipes')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('recipes');
        res.body.recipes.should.be.an('array');
        done();
      });
  });

  it('should return the correct amount of recipes', (done) => {
    chai.request(app)
      .get('/api/v1/recipes')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.recipes.length.should.equal(2);
        done();
      });
  });
});
