var Logger = require('..')
var test = require('tape')

var goodConf =
{
  Console: {
    type: 'Console',
    opts: {
      level: 'silly',
      colorize: true,
      json: false,
      handleExceptions: true,
      prettyPrint: true
    }
  },
  file: {
    type: 'File',
    opts: {
      filename: 'alllog.log',
      level: 'silly',
      json: false,
      handleExceptions: true,
      maxsize: 1048576,
      maxFiles: 5
    }
  },
  anotherfile: {
    type: 'File',
    opts: {
      name: 'first',
      filename: 'error_only.log',
      level: 'error',
      json: false,
      handleExceptions: true,
      maxsize: 1048576,
      maxFiles: 5
    }
  },
  anotherfile2: {
    type: 'File',
    instance: 'toto',
    opts: {
      filename: 'warn_only.log',
      level: 'warn',
      json: false,
      handleExceptions: true,
      maxsize: 1048576,
      maxFiles: 5
    }
  }
}

var badConf = {
  toto: {
    type: 'existepo',
    opts: {
      level: 'silly',
      colorize: true,
      json: false,
      handleExceptions: true,
      prettyPrint: true
    }
  }
}

test('instanciating :', function (t) {
  t.plan(2)
  t.throws(function () {
    Logger(badConf)
  }, 'Throw on bad type')
  var winston = Logger(goodConf)

  t.ok(winston, 'Constructor ok')

  winston.error('error')
  winston.warn('warn')
  winston.info('info')

  t.end()
})
