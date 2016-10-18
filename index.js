var logger = require('./lib/logger')

module.exports = function (conf) {
  return new logger(conf)
}
