const path = require('path');
const fs = require('fs');
const winston = require('winston');

const LOGS_PATH = path.join(__dirname, '/../../logs/logs.log')

const filename = fs.existsSync(LOGS_PATH)
  ? LOGS_PATH
  : path.join(LOGS_PATH);

const logger = winston.createLogger({
  transports: [new winston.transports.File({ filename })],
});

if (process.env.ENVIRONMENT !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

module.exports = logger;
