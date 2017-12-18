#!/usr/bin/env node

const AWS = require('aws-sdk');
const onoff = require('onoff');
const child_process_exec = require('child_process').exec;
const config = require('./config');

// setup
let pir = new onoff.Gpio(15, 'in', 'both');
let actionInProgress = false;
let continueAck = false;

// main
pir.watch(function(err, value) {
  // if (err) exit();

  if (actionInProgress) {
    if (value === 1) {
      continueAck = true;
    }
  } else {
    if (continueAck) {
      continueAck = false;
      actionInProgress = true;
      ack(false, () => {
        actionInProgress = false;
      });
    } else {
      if (value === 1) {
        actionInProgress = true;
        ack(true, () => {
          actionInProgress = false;
        });
      }
    }
  }

});

console.log(':: ready');

// lib

function ack(newAck, callback) {

  let timeHash = getHash();
  console.log('>> motion ack', timeHash);
  if (newAck) {
    notify(`motion ack ${timeHash}`);
  }

  record(timeHash, () => {

    callback();

    uploadAndClean(timeHash, () => {

      console.log('== motion complete', timeHash);
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
    if (err) console.log(err.message);
    else     console.log(`-- ${msg}`);
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
        console.log(err);
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
