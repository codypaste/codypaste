import { Router } from 'express';
import config from 'config';

const { baseAppUrl } = config.get('service');

import swaggerDocument from '../docs/swagger.json';

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

export default (): Router => {
  const router = Router();
  router.use(swaggerUi.serve);

  const options = {
    swaggerDefinition: Object.assign({}, swaggerDocument, { host: baseAppUrl }),
    apis: [],
  };

  const docs = swaggerJsdoc(options);

  router.get(
    '/',
    swaggerUi.setup(docs, {
      explorer: false,
    })
  );

  return router;
};
