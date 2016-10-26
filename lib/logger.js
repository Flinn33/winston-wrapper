var winston = require('winston')
var shortid = require('shortid')
//
// Logging levelss
//

module.exports = function (conf) {
  var transports = []
  var exceptionHandlers = []
  var uniqueName = []

  for (var prop in conf) {
    //only test prop, not prototype chain func
    if (conf.hasOwnProperty(prop)) {
      var obj = conf[prop]

      if (obj.opts) {
        if (!obj.opts.hasOwnProperty('name')) {
          obj.opts.name = shortid.generate()
        } else if (uniqueName.indexOf(obj.opts.name) !== -1) {
          throw new Error(obj.opts.name + ' is already a custom winston transport name, change it')
        }
      }else {
        obj.opts = {name: shortid.generate()}
      }
      uniqueName.push(obj.opts.name)

      if (winston.transports.hasOwnProperty(obj.type)) {
        if (!obj.instance || obj.instance !== 'exception') {
          transports.push(new (winston.transports[obj.type])(obj.opts))
        } else {
          exceptionHandlers.push(new (winston.transports[obj.type])(obj.opts))
        }
      }else {
        throw new Error(obj.type + ' is not a valid transport name')
      }
    }
  }

  return new (winston.Logger)({
    exceptionHandlers: exceptionHandlers,
    transports: transports,
    exitOnError: false
  })
}
/* test for setting default and multiple logger... */

/*

module.exports = function (conf, ...customTransports) {
  winston.setLevels(setup.levels)
  winston.addColors(setup.colors)

    //remove default console

  var transport = {}
  var removeDefaultConsole = false

  for (var prop in conf) {
    var obj = conf[prop]

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

  winston.remove(winston.transports.Console)

  return winston
} */
