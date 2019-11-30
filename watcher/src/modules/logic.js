const logger = require('./logger');
const { getHash, startRecording } = require('./utils')

const oneMinute = 60*1000
let actionInProgress = false
let lastTriggerTime = 0

const logic = function(err, value) {

  if (err) {
    logger.err(err)
  }

  if (value) {

    logger.info('Motion detected.')
    logger.warn(lastTriggerTime)
    let now = Date.now()

    if (!actionInProgress) {

      if (now - lastTriggerTime < oneMinute) {

        logger.info('Motion detected again within 1min.')
        logger.info('Recording...')
        actionInProgress = true
        startRecording(getHash(), () => {

          actionInProgress = false
          logger.info('Recording done.')
        })
      }
    }

    lastTriggerTime = now
  }
}

module.exports = { logic }
