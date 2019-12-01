const exec = require('./exec');

const setup = function (){
  exec(`nsenter -t 1 -m -u -n -i -- mkdir -p /root/raspistill/`, '.', () => {});
}

const start = function (hash, callback){
  let timeInSeconds = 10
  exec(`nsenter -t 1 -m -u -n -i -- raspistill -w 1920 -h 1440 -q 10 -t ${timeInSeconds * 1000} -tl 1000 -o /root/raspistill/${hash}%02d.jpg`, `.`, callback);
}

module.exports = { setup, start }
