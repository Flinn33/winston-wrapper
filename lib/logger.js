var winston = require('winston')
//
// Logging levelss
//

var setup = {
  levels: winston.config.npm.levels,
  colors: winston.config.npm.colors
}
/*
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
*/

function checkNeedForConsole(type, opts) {
   if (type === 'Console' && !opts) {
    return false
    }
   return true
}

module.exports = function (conf, ...customTransports) {
  winston.setLevels(setup.levels)
  winston.addColors(setup.colors)

  var transport = {}
  var removeDefaultConsole = true

  // Default logger conf
  for (var prop in conf) {
    var obj = conf[prop]
    console.log(prop)
    if (obj.opts && !obj.opts.hasOwnProperty('name')) {
      obj.opts.name = prop
    }
    var type = obj.type
    var opts = obj.opts
    var name = obj.instance
    if (winston.transports.hasOwnProperty(type)) {

      if (!name || name.toLowerCase() === 'default') {
          winston.add(winston.transports[type], opts)
      } else if (transport[name]) {
        transport[name]['opts'][type] = opts
      } else {
        var elem = {}
        elem['opts'] = {}
        elem['opts'][type] = opts
        transport[name] = elem
      }
    } else {
      throw new Error(type + ' is not a valid transport name')
    }
  }
  for (var elem in transport) {
    var logger = winston.loggers.add(elem, transport[elem]['opts'])

    //remove default console

    logger.remove(winston.transports.Console)
  }


  //remove default console
  if (removeDefaultConsole)
    winston.remove(winston.transports.Console)
  return winston
}

module.exports.setLevels = function (levels) {
  setup.levels = levels
}

module.exports.setColors = function (colors) {
  setup.colors = colors
}
