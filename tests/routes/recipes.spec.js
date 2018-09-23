const chai = require('chai');
require('chai/register-should');
const chaiHttp = require('chai-http');
const dirtyChai = require('dirty-chai');

const app = require('./../../app.js');
const { populateTables } = require('../seed/seed');

chai.use(chaiHttp);
chai.use(dirtyChai);

beforeEach(populateTables);

describe('Dummy test', () => {
  it('should pass', (done) => {
    done();
  });
});
