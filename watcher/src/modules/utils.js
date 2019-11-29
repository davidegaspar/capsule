const AWS = require('aws-sdk');
const logger = require('./logger');
const child_process_exec = require('child_process').exec;

const SNS_ARN = process.env.SNS_ARN

const getHash = function (){
  let now = new Date()
  return now.toJSON();
}

const notify = function (msg){
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

const exec = function (cmd, cwd, callback) {
  child_process_exec(
    cmd,
    {
      cwd: cwd,
      shell: '/bin/sh'
    },
    (err, stdout, stderr) => {
      logger.info(cmd, cwd);
      if (err) {
        logger.error(err);
        logger.info(`err ${cmd.substr(0, 24)}`);
      }else {
        logger.info(stdout);
        logger.info(stderr);
      }
      callback();
    }
  )
}

// function exit() {
//   pir.unexport();
//   process.exit();
// }

const ack = function (hash, callback) {

  record(hash, () => {

    callback();

    uploadAndClean(hash, () => {

      logger.info(`--- ${hash} done`);
    });
  });
}

const record = function (hash, callback){

  exec(`nsenter -t 1 -m -u -n -i -- mkdir -p /root/raspistill/`, '.', () => {

    exec(`nsenter -t 1 -m -u -n -i -- raspistill -w 1920 -h 1440 -q 10 -t 10000 -tl 1000 -o /root/raspistill/${hash}%02d.jpg`, `.`, callback);
  });
}

const uploadAndClean = function (hash, callback){

  // exec(`aws s3 cp --recursive ${hash} s3://capsule.davidegaspar.com/${hash}`, `/home/pi/tmp`, () => {
  //
  //   exec(`rm -rf ${hash}`, '/home/pi/tmp', callback);
  // });
}


module.exports = { getHash, notify, exec, ack, record, uploadAndClean }
