var Logger = require('..')
var test = require('tape')

var goodConf =
{
  konsole: {
    type: 'Console',
    instance: 'default',
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
      name: 'first',
      filename: 'test.log',
      level: 'silly',
      json: false,
      handleExceptions: true,
      maxsize: 1048576,
      maxFiles: 5
    }
  },
  anotherfile: {
    type: 'File',
    instance: 'category1',
    opts: {
      name: 'first',
      filename: 'test_shared.log',
      level: 'silly',
      json: false,
      handleExceptions: true,
      maxsize: 1048576,
      maxFiles: 5
    }
  },
  anotherconsole: {
    type: 'Console',
    instance: 'category1',
    opts: {
      colorize: true,
    }
  },
  anotherfile2: {
    type: 'File',
    instance: 'category2',
    opts: {
      name: 'first',
      filename: 'test_shared2.log',
      level: 'silly',
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
  var Logger = require('..')

  t.plan(2)
  t.throws(function () {
    Logger(badConf)
  }, 'Throw on bad type')
  var winston = Logger(goodConf)
  t.ok(winston, 'Constructor ok')

  winston.error('error')
  winston.warn('warn')
  winston.info('info')

  winston.loggers.get('category1').info('tesyt')
  winston.loggers.get('category2').debug('yep')
  require('./test2')
  t.end()
})
/*

 instance: {
    category1: {
      file: {
        type: 'File',
        opts: {
          name: 'first',
          filename: 'test_instance1.log',
          level: 'silly',
          json: false,
          handleExceptions: true,
          maxsize: 1048576,
          maxFiles: 5
        }
      }
    },
    category2: {
      file: {
        type: 'File',
        opts: {
          name: 'second',
          filename: 'test_instance2.log',
          level: 'silly',
          json: false,
          handleExceptions: true,
          maxsize: 1048576,
          maxFiles: 5
        }
      }
    }
  }*/
