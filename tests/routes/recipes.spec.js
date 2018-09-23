const chai = require('chai');
const should = require('chai').should();
const chaiHttp = require('chai-http');
const dirtyChai = require('dirty-chai');

chai.use(chaiHttp);
chai.use(dirtyChai);

describe('Dummy test', () => {
  it('should pass', (done) => {
    done();
  });
});
