const get = function (){
  let now = new Date()
  return now.toJSON();
}

module.exports = { get }
