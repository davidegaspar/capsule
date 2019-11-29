#!/usr/bin/env node

const onoff = require('onoff');
const logger = require('./modules/logger');
const { getHash, notify, ack } = require('./modules/utils');

// setup
let pir = new onoff.Gpio(15, 'in', 'both');
let actionInProgress = false;
let continueAck = false;
let space = '                        ';
logger.info('::: setup');

// main
pir.watch(function(err, value) {
  // if (err) exit();

  let timeHash = getHash();
  logger.info(`${actionInProgress?'>':' '}${value}${continueAck?'>':' '} ${timeHash} motion`);

  if (actionInProgress) {

    if (value === 1) {

      continueAck = true;
      logger.info(`${actionInProgress?'>':' '}${value}${continueAck?'>':' '} ${space} continue`);
    }
  } else {
    if (continueAck) {

      continueAck = false;
      actionInProgress = true;
      logger.info(`${actionInProgress?'>':' '}${value}${continueAck?'>':' '} ${space} ack`);

      ack(timeHash, () => {
        actionInProgress = false;
      });
    } else {

      if (value === 1) {

        actionInProgress = true;
        logger.info(`${actionInProgress?'>':' '}${value}${continueAck?'>':' '} ${space} notify + ack`);

        notify(`motion ack ${timeHash}`);
        ack(timeHash, () => {
          actionInProgress = false;
        });
      }
    }
  }
});

logger.info('::: ready');
// notify(`ready`);
