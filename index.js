#!/usr/bin/env node

const AWS = require('aws-sdk');
const onoff = require('onoff');
const child_process_exec = require('child_process').exec;
const config = require('./config');

// setup
let pir = new onoff.Gpio(15, 'in', 'both');
let actionInProgress = false;
let continueAck = false;
let space = '                        ';

// main
pir.watch(function(err, value) {
  // if (err) exit();

  let timeHash = getHash();
  console.log(`${actionInProgress?'>':' '}${value}${continueAck?'>':' '} ${timeHash} motion`);

  if (actionInProgress) {

    if (value === 1) {

      continueAck = true;
      console.log(`${actionInProgress?'>':' '}${value}${continueAck?'>':' '} ${space} continue`);
    }
  } else {
    if (continueAck) {

      continueAck = false;
      actionInProgress = true;
      console.log(`${actionInProgress?'>':' '}${value}${continueAck?'>':' '} ${space} ack`);

      ack(timeHash, () => {
        actionInProgress = false;
      });
    } else {

      if (value === 1) {

        actionInProgress = true;
        console.log(`${actionInProgress?'>':' '}${value}${continueAck?'>':' '} ${space} notify + ack`);

        notify(`motion ack ${timeHash}`);
        ack(timeHash, () => {
          actionInProgress = false;
        });
      }
    }
  }
});

console.log('::: ready');

// lib

function ack(hash, callback) {

  record(hash, () => {

    callback();

    uploadAndClean(hash, () => {

      console.log(`--- ${hash} done`);
    });
  });
}

function record(hash, callback){

  exec(`mkdir -p ${hash}`, '/home/pi/tmp', () => {

    exec(`raspistill -w 1920 -h 1440 -q 10 -t 10000 -tl 1000 -o %02d.jpg`, `/home/pi/tmp/${hash}`, callback);
  });
}

function uploadAndClean(hash, callback){

  exec(`aws s3 cp --recursive ${hash} s3://capsule.davidegaspar.com/${hash}`, `/home/pi/tmp`, () => {

    exec(`rm -rf ${hash}`, '/home/pi/tmp', callback);
  });
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
    TopicArn: config.sns_arn
  };
  sns.publish(params, function(err, data) {
    if (err) {
      // console.log(err.message);
      console.log(`err ${space} notify`);
    } else {
      // console.log(`-- ${msg}`);
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
      // console.log(cmd, cwd);
      if (err) {
        // console.log(err);
        console.log(`err ${cmd.substr(0, 24)}`);
      }else {
        // console.log(stdout);
        // console.log(stderr);
      }
      callback();
    }
  )
}

// function exit() {
//   pir.unexport();
//   process.exit();
// }
