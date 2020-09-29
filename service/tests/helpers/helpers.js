const request = require('supertest');

const helpers = ({ host, path, contentType }) => {
  const createResource = payload => ({
    post: () => request(host)
      .post(path)
      .set('Content-Type', contentType)
      .send(payload),
  });

  const getResource = () => ({
    getByID: async id => request(host)
      .get(`${path}/${id}`)
      .set('Content-Type', contentType),
  });

  const searchForResource = () => ({
    post: async searchPayload => request(host)
      .post(path)
      .set('Content-Type', contentType)
      .send(searchPayload),
  });

  const deleteResource = async id => request(host).delete(`${path}/${id}`);

  const tryToCreateAndExpectError = async (payload, statusCode = 422) => {
    const response = await createResource().post(payload);
    response.statusCode.should.be.equal(statusCode);
    return response;
  };

  const createAndExpectSuccess = async (payload) => {
    const response = await createResource().post(payload);
    response.statusCode.should.be.equal(201);
    return response;
  };

  return {
    createResource,
    getResource,
    tryToCreateAndExpectError,
    createAndExpectSuccess,
    searchForResource,
    deleteResource,
  };
};

module.exports = { helpers };
