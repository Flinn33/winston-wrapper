var Logger = require('..')
var test = require('tape')

var goodConf =
{
  konsole: {
    type: 'Console',
    opts: {
      level: 'wutwat',
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

  var Logger = require('..')
  Logger.setColors({
    error: 'blue',
    debug: 'red',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta',
    wutwat: 'white'
  })
  Logger.setLevels({
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6,
    wutwat: 7
  })
  
  t.plan(2)
  t.throws(function() {
    Logger(badConf)
  }, 'Throw on bad type')
  var mylogger = Logger(goodConf)
  t.ok(mylogger, 'Constructor ok')

  mylogger.error('waow')
  mylogger.silly('error')
  mylogger.wutwat('supertest')


  t.end()
})
