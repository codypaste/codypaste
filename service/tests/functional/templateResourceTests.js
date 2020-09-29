require('mocha');
const should = require('should');

const { templateResourceHelpers } = require('../helpers/helpersFactory');

describe('Template Resource Tests', () => {
  it('should be able to access POST /templateResource', async () => {
    const postResponse = await templateResourceHelpers.createResource({}).post();
    postResponse.statusCode.should.be.equal(200);
  });

  it('should be able to access GET /templateResource/:id', async () => {
    const getResponse = await templateResourceHelpers.getResource().getByID(123);
    getResponse.statusCode.should.be.equal(200);
  });

  it('should be able to access DELETE /templateResource/:id', async () => {
    const deleteResponse = await templateResourceHelpers.deleteResource(123);
    deleteResponse.statusCode.should.be.equal(200);
  });
});
