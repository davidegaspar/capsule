const AWS = require('aws-sdk');
const logger = require('./logger');

const cloudWatch = new AWS.CloudWatch();

const PING = 0
const MOTION_IGNORED = 1
const MOTION_RECORDED = 2

const putMetric = function (value) {

  var params = {
    MetricData: [
      {
        MetricName: 'status',
        Timestamp: new Date(),
        Unit: 'count',
        Value: value,
      },
    ],
    Namespace: 'CAPSULE'
  };

  cloudWatch.putMetricData(params, function(err, data) {
    if (err) {
      logger.error(err)
    } else {
      logger.debug(data)
    }
  });
}

module.exports = { PING, MOTION_RECORDED, MOTION_IGNORED, putMetric }
