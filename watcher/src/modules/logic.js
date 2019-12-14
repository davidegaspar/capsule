const logger = require('./logger');
const hash= require('./hash')
const record = require('./record')
const { getData } = require('./http')
const { MOTION_RECORDED, MOTION_IGNORED, putMetric } = require('./metrics')

const API_URL = 'https://exrxoe7id3.execute-api.us-east-1.amazonaws.com/Prod'
const API_KEY = process.env.API_KEY
const RESOURCE_ID = process.env.RESOURCE_ID
const oneMinute = 60*1000
const configPullTimeInSeconds = 1

let actionInProgress = false
let lastTriggerTime = 0
let config = {}

const configPull = async function (){

  config = await getData(API_URL, API_KEY, RESOURCE_ID)
  logger.debug('configPull', config)

  setInterval(() => {
    config = await getData(API_URL, API_KEY, RESOURCE_ID)
    logger.debug('configPull', config)
  }, configPullTimeInSeconds * 1000)
}

const logic = function(err, value) {

  if (err) {
    logger.err(err)
  }

  if (value) {

    logger.debug('Motion detected.')

    let triggerTime = Date.now()

    if (!actionInProgress) {

      let secondActionInLessThanOneMinute = (triggerTime - lastTriggerTime) < oneMinute

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

module.exports = { logic, configPull }
