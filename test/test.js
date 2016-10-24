var Logger = require('..')
var test = require('tape')

var goodConf =
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
  require('winston-mail').Mail
  require('winston-mongodb').MongoDB


  t.plan(2)
  var mylogger = Logger(goodConf)

  t.ok(mylogger, 'Constructor ok')
  mylogger.error('waow')
  mylogger.silly('error')

  t.throws(function() {
    Logger(badConf)
  }, 'Throw on bad type')
  t.end()
})
