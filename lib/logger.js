var winston = require('winston')
//
// Logging levelss
//

var setup = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta'
  }
}

module.exports = function (conf, ...customTransports) {
  var transports = []

  for (var prop in conf) {
    var obj = conf[prop]
    if (obj.opts && !obj.opts.hasOwnProperty('name')) {
      obj.opts.name = prop
    }

    if (winston.transports.hasOwnProperty(obj.type)) {
      transports.push(new (winston.transports[obj.type])(obj.opts))
    }else {
      throw new Error(obj.type + ' is not a valid transport name')
    }
  }

  return new (winston.Logger)({
    levels: setup.levels,
    colors: setup.colors,
    transports: transports
  })
}

module.exports.setLevels = function(levels) {
  setup.levels = levels
}

module.exports.setColors = function(colors) {
  setup.colors = colors
}
