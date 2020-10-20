const authorizationActivities = require('./authorizationActivities');
const groupsActivities = require('./groupsActivities');

const authorizationDao = require('../dao/usersDao');
const groupsDao = require('../dao/groupsDao');

module.exports = {
  get getAuthorizationActivities() {
    return authorizationActivities(authorizationDao);
  },

  get getGroupsActivities() {
    return groupsActivities(groupsDao);
  },
};
