const { helpers } = require('./helpers');

const host = 'localhost:8080';

module.exports = {
  get groupsHelpers() {
    return helpers({
      host,
      path: '/groups',
      contentType: 'application/json',
    });
  }
};