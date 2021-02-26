import { Response, Router } from 'express';
import fs from 'fs';

export default (): Router => {
  const router = Router();

  router.get('/build', (_, res: Response) => {
    const fileName = 'build-info.json';
    const buildInfo = fs.existsSync(fileName) ? JSON.parse(fs.readFileSync(fileName).toString()) : null;
    res.send(buildInfo);
  });

  router.get('/status', (_, res: Response) => {
    res.send('OK');
  });

  return router;
};
