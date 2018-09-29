import chai from 'chai';
import 'chai/register-should';
import chaiHttp from 'chai-http';
import dirtyChai from 'dirty-chai';
import pool from '../../server/db/config';

import app from '../../server/app';
import { seedData, populateTables } from '../seed/seed';

const validId = Math.ceil(Math.random() * seedData.recipes.length);
const invalidId = seedData.recipes.length + 1;

const data = {
  complete: {
    name: 'new recipe',
    ingredients: 'recipe ingredients',
    directions: 'how to prepare meal with this recipe',
  },
  incomplete: {
    name: 'recipe 2',
    directions: 'no ingredients',
  },
};

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

describe('POST /recipes', () => {
  it('should successfully add new recipe to db on provision of complete data', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .send(data.complete)
      .end((err, res) => {
        if (err) done(err);

        res.status.should.eql(201);
        res.body.should.be.an('object').which.has.keys(['message', 'recipe']);
        res.body.recipe[0].should.eql({ id: 3, ...data.complete });
        done();
      });
  });

  it('should respond with a 400 if data is incomplete', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .send(data.incomplete)
      .end((err, res) => {
        if (err) done(err);

        res.status.should.eql(400);
        res.body.should.have.keys(['error']);
        done();
      });
  });
});

describe('PUT /recipes/:id', () => {
  it('should update existing recipe if complete data is provided', (done) => {
    chai.request(app)
      .put(`/api/v1/recipes/${validId}`)
      .send(data.complete)
      .end(async (err, res) => {
        if (err) done(err);

        res.status.should.eql(200);
        res.body.should.be.an('object');

        try {
          const updatedRecipe = (await pool.query('SELECT * FROM recipes WHERE id=$1', [validId])).rows[0];
          updatedRecipe.should.eql({ id: validId, ...data.complete });
          done();
        } catch (error) {
          done(error);
        }
      });
  });

  it('should update existing recipe if incomplete data is provided', (done) => {
    chai.request(app)
      .put(`/api/v1/recipes/${validId}`)
      .send(data.incomplete)
      .end(async (err, res) => {
        if (err) done(err);

        res.status.should.eql(200);
        res.body.should.be.an('object');

        try {
          const updatedRecipe = (await pool.query('SELECT * FROM recipes WHERE id=$1', [validId])).rows[0];
          updatedRecipe.name.should.eql(data.incomplete.name);
          updatedRecipe.directions.should.eql(data.incomplete.directions);
          done();
        } catch (error) {
          done(error);
        }
      });
  });

  it('should respond with a 400 if non-existent recipe id is provided', (done) => {
    chai.request(app)
      .put(`/api/v1/recipes/${invalidId}`)
      .send({})
      .end((err, res) => {
        if (err) done(err);

        res.status.should.eql(400);
        done();
      });
  });
});
