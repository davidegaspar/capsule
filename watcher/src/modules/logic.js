const logger = require('./logger');
const { getHash, startRecording } = require('./utils')
const { getData } = require('./http')

const API_KEY = process.env.API_KEY
const RESOURCE_ID = process.env.RESOURCE_ID
const oneMinute = 60*1000

let actionInProgress = false
let lastTriggerTime = 0

const logic = async function(err, value) {

  if (err) {
    logger.err(err)
  }

  // cw

  const config = await getData('https://exrxoe7id3.execute-api.us-east-1.amazonaws.com/Prod', API_KEY, RESOURCE_ID)

  if (config.enabled) {

    if (value) {

      // cw 1
      logger.info('Motion detected.')

      let triggerTime = Date.now()

      if (!actionInProgress) {

        if (triggerTime - lastTriggerTime < oneMinute) {

          logger.info('Motion detected again within 1min.')
          logger.info('Recording...')
          actionInProgress = true
          startRecording(getHash(), () => {

            actionInProgress = false
            logger.info('Recording done.')
          })
        }
      }

      lastTriggerTime = triggerTime
    } else {
      // cw 0
    }
  } else {
    // cw -1
  }
}

module.exports = { logic }
