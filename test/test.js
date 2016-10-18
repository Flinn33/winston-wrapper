var index = require('..')
var test = require('tape')

var conf =
{
  toto: {
    type: 'console',
    opts: {
      level: 'silly',
      colorize: true,
      json: false,
      handleExceptions: true,
      prettyPrint: true
    }
  },
  tata: {
    type: 'file',
    opts: {
      name: 'first',
      filename: 'test.log',
      level: 'error',
      json: false,
      handleExceptions: true,
      maxsize: 1048576,
      maxFiles: 5
    }
  },
    rktr: {
    type: 'file',
    opts: {
      name: 'second',
      filename: 'test2.log',
      level: 'info',
      json: false,
      handleExceptions: true,
      maxsize: 1048576,
      maxFiles: 5
    }
  }

}

test('instanciating :', function (t) {
  t.plan(1)
  var logger = index(conf)

  t.ok(logger)
  logger.silly('coucou')
  logger.info('waow')
  
})
