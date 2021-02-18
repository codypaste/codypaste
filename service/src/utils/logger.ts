import pino from 'pino';
import pinoms, { multistream, Streams } from 'pino-multi-stream';
import config from 'config';
import fs from 'fs';
import path from 'path';
import Container from 'typedi';
import { LOGGER } from '../di-container/diTokens';

const {
  logger: { instanceName, level, pretty },
} = config.get('service');

const logsDir = path.resolve(__dirname, '../../logs');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const stdoutStream = pretty
  ? pinoms.prettyStream({
      prettyPrint: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'hostname,pid',
        levelFirst: true,
      },
    })
  : process.stdout;

const streams: Streams = [
  { level, stream: fs.createWriteStream(`${logsDir}/logs.log`) },
  { level, stream: stdoutStream },
  { level: 'error', stream: fs.createWriteStream(`${logsDir}/error.log`) },
];

const logger = pino(
  {
    name: instanceName,
    level,
  },
  multistream(streams)
);

Container.set(LOGGER, logger);

export default logger;
