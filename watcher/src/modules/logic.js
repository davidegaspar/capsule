const logger = require('./logger');
const hash= require('./hash')
const record = require('./record')
const { getData } = require('./http')
const { MOTION_RECORDED, MOTION_IGNORED, putMetric } = require('./metrics')

const API_KEY = process.env.API_KEY
const RESOURCE_ID = process.env.RESOURCE_ID
const oneMinute = 60*1000

let actionInProgress = false
let lastTriggerTime = 0

const logic = async function(err, value) {

  if (err) {
    logger.err(err)
  }

  if (value) {

    const config = await getData('https://exrxoe7id3.execute-api.us-east-1.amazonaws.com/Prod', API_KEY, RESOURCE_ID)

    logger.info('Motion detected.')

    let triggerTime = Date.now()

    if (!actionInProgress) {

      let secondActionInLessThanOneMinute = triggerTime - lastTriggerTime < oneMinute

      if (secondActionInLessThanOneMinute) {

        logger.info('Motion detected again within 1min.')

        if (config.enableRecording) {

          logger.info('Recording...')
          putMetric(MOTION_RECORDED)
          actionInProgress = true
          record.start(hash.get(), () => {

            actionInProgress = false
            logger.info('Recording done.')
          })
        } else {
          putMetric(MOTION_IGNORED)
        }
      }
    }

    lastTriggerTime = triggerTime
  }
}

module.exports = logic
