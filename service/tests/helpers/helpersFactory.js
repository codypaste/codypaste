const { helpers } = require('./helpers');

const host = () => 'http://0.0.0.0:3000';

module.exports = {
  get templateResourceHelpers() {
    return helpers({
      host: host(),
      path: '/templateResource',
      contentType: 'application/json',
    });
  },
};
