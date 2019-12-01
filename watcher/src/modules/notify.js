// const AWS = require('aws-sdk');

// const SNS_ARN = process.env.SNS_ARN

// const notify = function (msg){
//   let sns = new AWS.SNS({
//     region: "us-east-1"
//   });
//   let params = {
//     Message: msg,
//     Subject: 'capsule',
//     TopicArn: SNS_ARN
//   };
//   sns.publish(params, function(err, data) {
//     if (err) {
//       // logger.info(err.message);
//       logger.info(`err ${space} notify`);
//     } else {
//       // logger.info(`-- ${msg}`);
//     }
//   });
// }

// module.exports = { notify }
