const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    label(),
    timestamp(),
    printf()
  ),
  transports: [new transports.Console()]
});

module.exports = logger
