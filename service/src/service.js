const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const config = require('config');
const restLoader = require('./rest/restLoader');
const { info } = require('./utils/logger');
const { errorCatchingMiddleware } = require('./rest/middlewares/errorCatchingMiddleware');

const PORT = config.get('service.port');

const create = () => {
  const service = new Koa();

  service
    .use(cors({
      maxAge: 600,
      keepHeadersOnError: true,
      origin: '*',
    }))
    .use(bodyParser())
    .use(errorCatchingMiddleware);

  restLoader.setupRest(service);

  service.listen(PORT);
  info(`Service listening at port ${PORT}`);
};

module.exports = { create };
