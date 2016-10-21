var Logger = require('..')
var test = require('tape')

var conf =
{
  konsole: {
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
      name: 'first',
      filename: 'test.log',
      level: 'silly',
      json: false,
      handleExceptions: true,
      maxsize: 1048576,
      maxFiles: 5
    }
  },
  http: {
    type: 'Http',
    opts: {
      level: 'warn',
      host: 'localhost',
      port: '8080',
      level: 'silly'
    }
  },
  Mongo: {
    type: 'MongoDB',
    opts: {
      level: 'error',
      db: 'mongodb://akeros:akeros@ds011374.mlab.com:11374/agm_db'
    }
  }

}

/*
//web endpoint
var winstond = require('winstond')

var http = winstond.http.createServer({
  services: ['collect', 'query', 'stream'],
  port: 8080
})

http.add(winstond.transports.Console, {})
http.listen()
*/

test('instanciating :', function (t) {
  //var winston = require('winston')
    var Logger = require('..')
  require('winston-mail').Mail
  require('winston-mongodb').MongoDB


  t.plan(1)
  var mylogger = Logger(conf)

  t.ok(mylogger, 'constructor ok')
  mylogger.error('waow')
  mylogger.silly('error')
  t.end()
})
