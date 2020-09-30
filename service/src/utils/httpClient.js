const request = require('request-promise');

const get = async (uri, queryString, override) => {
  const options = Object.assign({}, {
    method: 'GET',
    uri,
    qs: queryString,
    json: true,
  }, override);

  return request(options);
};

module.exports = {
  get,
};
