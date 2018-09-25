const chai = require('chai');
require('chai/register-should');
const chaiHttp = require('chai-http');
const dirtyChai = require('dirty-chai');
const pool = require('../../db/config');

const app = require('./../../app.js');
const { seedData, populateTables } = require('../seed/seed');

const validId = Math.ceil(Math.random() * seedData.recipes.length);
const invalidId = seedData.recipes.length + 1;

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

describe('GET /recipes/:id', () => {
  it('should return a recipe if valid recipe id is provided', (done) => {
    chai.request(app)
      .get(`/api/v1/recipes/${validId}`)
      .end((err, res) => {
        if (err) done(err);
        res.status.should.equal(200);
        res.body.should.be.an('object').that.has.property('recipe');
        res.body.recipe.should.contain.keys(['name', 'ingredients', 'directions']);
        done();
      });
  });

  it('should return a 404 if invalid recipe id is provided', (done) => {
    chai.request(app)
      .get(`/api/v1/recipes/${invalidId}`)
      .end((err, res) => {
        if (err) done(err);
        res.status.should.equal(404);
        done();
      });
  });

  it('should return a 400 status if invalid id type is used', (done) => {
    chai.request(app)
      .get('/api/v1/recipes/thisIsWrong')
      .end((err, res) => {
        if (err) done(err);
        res.status.should.equal(400);
        done();
      });
  });
});

describe('DELETE /recipes/:id', () => {
  it('should respond with a 204 if recipes is deleted successfully', (done) => {
    chai.request(app)
      .delete(`/api/v1/recipes/${validId}`)
      .end((err, res) => {
        if (err) done(err);
        res.status.should.equal(204);
        done();
      });
  });

  it('should respond with a 400 invalid id type is used', (done) => {
    chai.request(app)
      .delete('/api/v1/recipes/woned')
      .end((err, res) => {
        if (err) done(err);
        res.status.should.equal(400);
        done();
      });
  });

  it('should actually delete the recipe from the database', (done) => {
    chai.request(app)
      .delete(`/api/v1/recipes/${validId}`)
      .end(async (err) => {
        if (err) done(err);

        try {
          const recipeCount = (await pool.query('SELECT * FROM recipes')).rowCount;
          recipeCount.should.equal(1);
          done();
        } catch (error) {
          done(error);
        }
      });
  });
});
