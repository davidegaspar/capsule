const logger = require('./logger');
const child_process_exec = require('child_process').exec;

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
        logger.debug(stdout);
        logger.debug(stderr);
      }
      callback();
    }
  )
}

module.exports = exec
