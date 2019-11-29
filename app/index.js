#!/usr/bin/env node

const AWS = require('aws-sdk');
const onoff = require('onoff');
const child_process_exec = require('child_process').exec;
const logger = require('./modules/logger');

// config
const SNS_ARN = process.env.SNS_ARN
logger.info('::: config');

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
notify(`ready`);

// lib

function ack(hash, callback) {

  record(hash, () => {

    callback();

    uploadAndClean(hash, () => {

      logger.info(`--- ${hash} done`);
    });
  });
}

function record(hash, callback){

  exec(`mkdir -p ${hash}`, '.', () => {

    exec(`nsenter -t 1 -m -u -n -i -- raspistill -w 1920 -h 1440 -q 10 -t 10000 -tl 1000 -o %02d.jpg`, `./${hash}`, callback);
  });
}

function uploadAndClean(hash, callback){

  // exec(`aws s3 cp --recursive ${hash} s3://capsule.davidegaspar.com/${hash}`, `/home/pi/tmp`, () => {
  //
  //   exec(`rm -rf ${hash}`, '/home/pi/tmp', callback);
  // });
}

function getHash(){
  let now = new Date()
  return now.toJSON();
}

function notify(msg){
  let sns = new AWS.SNS({
    region: "us-east-1"
  });
  let params = {
    Message: msg,
    Subject: 'capsule',
    TopicArn: SNS_ARN
  };
  sns.publish(params, function(err, data) {
    if (err) {
      // logger.info(err.message);
      logger.info(`err ${space} notify`);
    } else {
      // logger.info(`-- ${msg}`);
    }
  });
}

function exec(cmd, cwd, callback) {
  child_process_exec(
    cmd,
    {
      cwd: cwd,
      shell: '/bin/sh'
    },
    (err, stdout, stderr) => {
      // logger.info(cmd, cwd);
      if (err) {
        logger.error(err);
        logger.info(`err ${cmd.substr(0, 24)}`);
      }else {
        // logger.info(stdout);
        // logger.info(stderr);
      }
      callback();
    }
  )
}

// function exit() {
//   pir.unexport();
//   process.exit();
// }
