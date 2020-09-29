const authorizationActivities = require('./authorizationActivities');
const authorizationDao = require('../dao/usersDao');

module.exports = {
  get getAuthorizationActivities() {
    return authorizationActivities(authorizationDao);
  },
};
