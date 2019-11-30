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

const setup = function (){
  exec(`nsenter -t 1 -m -u -n -i -- mkdir -p /root/raspistill/`, '.', () => {});
}

const startRecording = function (hash, callback){
  let timeInSeconds = 10
  exec(`nsenter -t 1 -m -u -n -i -- raspistill -w 1920 -h 1440 -q 10 -t ${timeInSeconds * 1000} -tl 1000 -o /root/raspistill/${hash}%02d.jpg`, `.`, callback);
}

module.exports = { getHash, notify, exec, startRecording, setup }
