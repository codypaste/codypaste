require('should');

const { groupCreationPayload } = require('../../payloads/groupPayloads');
const groupsTestHelpers = require('../../helpers/helpersFactory').groupsHelpers;

describe('Creating groups POST /groups', () => {
  it('Should create new group with valid payload', async () => {
    const postResponse = await groupsTestHelpers
      .createResource()
      .post(groupCreationPayload());

    postResponse.status.should.be.equal(201);
  });
});
