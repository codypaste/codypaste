const Boom = require('@hapi/boom');

const httpMethods = require('../../enums/httpMethodsEnums');
const { userAuthMiddleware } = require('../middlewares/userAuthMiddleware');

const groupsActivities = require('../../activities/activitiesFactory').getGroupsActivities;

/*
  Example payload:
  {
    "title": "Example title",
    "expirationDatetime": "2020-10-20T19:37:55.077Z",
    "password": "some secret"
  }
*/
const createGroup = async (ctx, next) => {
  const { body: groupData } = ctx.request;

  const { groupId } = await groupsActivities(ctx.user).createGroup(groupData);

  ctx.status = 201;

  ctx.body = {
    groupId,
  };

  return next();
};

const getGroup = async (ctx, next) => {
  const { groupId } = ctx.params;

  const [group] = await groupsActivities(ctx.user).getGroup(groupId);

  if (!group) {
    throw Boom.notFound(`Group with id: ${groupId} not found`);
  }

  ctx.status = 200;
  ctx.body = group;

  return next();
};

const getUserGroups = async (ctx, next) => {
  const groups = await groupsActivities(ctx.user).getUserGroups();

  ctx.status = 200;
  ctx.body = groups;

  return next();
};

module.exports = {
  endpointName: 'Groups',
  prefix: '/groups',
  resourceEndpoints: [
    {
      method: httpMethods.POST,
      path: '/',
      middlewares: [userAuthMiddleware],
      handler: createGroup,
    },
    {
      method: httpMethods.GET,
      path: '/:groupId',
      middlewares: [userAuthMiddleware],
      handler: getGroup,
    },
    {
      method: httpMethods.GET,
      path: '/',
      middlewares: [userAuthMiddleware],
      handler: getUserGroups,
    },
  ],
};
