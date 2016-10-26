var winston = require('winston')
var shortid = require('shortid')
//
// Logging levelss
//

function checkNameExist (obj, uniqueName) {
  if (obj.hasOwnProperty('opts') && obj.opts.hasOwnProperty('name') && uniqueName.indexOf(obj.opts.name) !== -1) {
    throw new Error(obj.opts.name + ' is already a custom winston transport name, change it')
  }
}

function checkTransportExist (obj) {
  var errorString = 'The property "type" must be set to a valid transport name (Console, Http, File...). View winston transport doc.'

  if (!obj.hasOwnProperty('type')) {
    throw new Error('Transport type is not set. ' + errorString)
  } else if (obj.hasOwnProperty('type') && !winston.transports.hasOwnProperty(obj.type)) {
    throw new Error(obj.type + ' is not a valid transport name. ' + errorString)
  }
}

function setName (obj) {
  if (obj.hasOwnProperty('opts') && !obj.opts.hasOwnProperty('name')) {
    obj.opts.name = shortid.generate()
  } else if (!obj.hasOwnProperty('opts')) {
    obj.opts = {name: shortid.generate()}
  }
}

module.exports = function (conf) {
  var transports = []
  var exceptionHandlers = []
  var uniqueName = []

  for (var prop in conf) {
    // only test properties, not prototype chain func
    if (conf.hasOwnProperty(prop)) {
      var obj = conf[prop]
      checkTransportExist(obj)
      checkNameExist(obj, uniqueName)
      setName(obj)

      uniqueName.push(obj.opts.name)
      /* push transport */
      if (!obj.instance || obj.instance !== 'exception') {
        transports.push(new (winston.transports[obj.type])(obj.opts))
      } else {
        exceptionHandlers.push(new (winston.transports[obj.type])(obj.opts))
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
