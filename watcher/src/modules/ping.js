const logger = require('./logger');
const { PING, putMetric } = require('./metrics')

const start = function (){

  let pingTimeInSeconds = 60

  setInterval(() => {
    logger.debug('ping')
    putMetric(PING)
  }, pingTimeInSeconds * 1000)
}

module.exports = { start }
