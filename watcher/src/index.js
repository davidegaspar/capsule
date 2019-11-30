#!/usr/bin/env node

const onoff = require('onoff');
const logger = require('./modules/logger');
const { getHash, notify, startRecording, setup } = require('./modules/utils');

// setup
let pir = new onoff.Gpio(15, 'in', 'both');
setup()

// main
let actionInProgress = false;
pir.watch(function(err, value) {

  if (err) {
    logger.err(err)
  }

  let timeHash = getHash();

  if (value && !actionInProgress) {

    logger.info('Motion detected.')
    actionInProgress = true;

    logger.info('Recording started...')
    startRecording(timeHash, () => {

      actionInProgress = false;
      logger.info('Recording done.')
    });
    // notify(`motion ack ${timeHash}`);
  }
});

logger.info('Ready.');
// notify(`ready`);
