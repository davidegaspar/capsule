const { PING, putMetric } = require('./metrics')

const start = function (){

  let pingTimeInSeconds = 600

  setInterval(() => {
    putMetric(PING)
  }, pingTimeInSeconds * 1000)
}

module.exports = { start }
