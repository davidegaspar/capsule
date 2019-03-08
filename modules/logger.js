const winston = require('winston');

function getHash(){
  let now = new Date()
  return now.toJSON();
}

let hash = getHash();

module.exports = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({ filename: `${hash}-error.log`, level: 'error' }),
    new winston.transports.File({ filename: `${hash}-info.log`, level: 'info' }),
  ],
});
