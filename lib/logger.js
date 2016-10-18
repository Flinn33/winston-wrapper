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

module.exports = function (conf) {
  var transports = []

  for (var prop in conf) {
    var obj = conf[prop]
    if (obj.opts && !obj.opts.hasOwnProperty('name')) {
      obj.opts.name = prop
    }



    switch (obj.type) {
      case 'console':
      case 'terminal':
      case 'term':
      case 'stdout':
        transports.push(new (winston.transports.Console)(obj.opts))
        break
      case 'file':
      case 'fichier':
        transports.push(new (winston.transports.File)(obj.opts))
        break
      case 'web':
      case 'http':
        transports.push(new (winston.transports.Http)(obj.opts))
        break
      default:
        break
    }
  }

  return new (winston.Logger)({
    levels: conf.levels || setup.levels,
    colors: conf.colors || setup.colors,
    transports: transports
  })
}
