const fs = require('fs');
const Router = require('koa-router');

const REST_MODULES_DIR = `${__dirname}/endpoints`;

const { info } = require('../utils/logger');

const registerEndpoint = (router, prefix) => (resourceEndpoint) => {
  const {
    method, path, handler, middlewares = [],
  } = resourceEndpoint;

  info(`Registering method ${method} at path ${prefix}${path}`);

  router[method](path, ...middlewares, handler);
};

/**
 * Registering all endpoints and their handlers
 */
const setupRest = (service) => {
  const registeredRouters = fs.readdirSync(REST_MODULES_DIR).map((restFile) => {
    const { endpointName, prefix, resourceEndpoints } = require(`${REST_MODULES_DIR}/${restFile}`);

    info(`Loading rest for ${endpointName}`);

    const resourceRouter = new Router({ prefix });

    resourceEndpoints.forEach(registerEndpoint(resourceRouter, prefix), prefix);

    return resourceRouter;
  });

  registeredRouters.forEach((registeredRouter) => {
    service.use(registeredRouter.routes());
    service.use(registeredRouter.allowedMethods());
  });
};

module.exports = { setupRest };
