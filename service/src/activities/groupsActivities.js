const bcrypt = require('bcryptjs');
const config = require('config');

const hashPasswordIfApplicable = async (group) => {
  if (!group.password || group.password.length < 1) {
    return group;
  }

  return Object.assign(group, {
    password: await bcrypt.hash(
      group.password, await bcrypt.genSalt(config.get('service.saltRounds')),
    ),
  });
};

const authorizedUserActivities = (groupsDao, authorizedUser) => {
  const createGroup = async groupPayload => {
      groupPayload.author = authorizedUser.userId;
      return groupsDao.createGroup(await hashPasswordIfApplicable(groupPayload))
  };

  const getGroup = async (groupId) => {
    return groupsDao.getGroups({ groupId });
  }

  const getUserGroups = async () => {
    return groupsDao.getGroups({ author: authorizedUser.userId });
  }

  return {
    createGroup,
    getGroup,
    getUserGroups 
  };
};

const nonAuthorizedUserActivities = (groupsDao) => {
  const createGroup = async groupPayload => {
    return groupsDao.createGroup(await hashPasswordIfApplicable(groupPayload))
  };

  const getGroup = async (groupId) => {
    return groupsDao.getGroups({ groupId });
  }

  const getUserGroups = async () => {
    throw Boom.forbidden();
  }

  return {
    createGroup,
    getGroup,
    getUserGroups 
  };
};

module.exports = groupsDao => {
    return authorizedUser => 
        authorizedUser ? 
            authorizedUserActivities(groupsDao, authorizedUser) 
            : nonAuthorizedUserActivities(groupsDao)
}
