'use strict';

// import required modules
import winston from 'winston';

// https://github.com/fastify/example/blob/master/winston-logger/winston-logger.js
// create a winston logger as a custom logger for fastify
const logger = winston.createLogger({
  // define levels required by fastify (by default winston has verbose level and does not have trace)
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    trace: 4,
    debug: 5
  },
  // setup log level
  level: 'info',
  // setup logs format
  format: winston.format.json(),
  // define transports to write logs, it could be http, file or console
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// export winston logger instance
export default logger;
