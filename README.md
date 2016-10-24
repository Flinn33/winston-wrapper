# Logger
Wrapping the [winston module](https://www.npmjs.com/package/winston).

The wrapper is for creating as many winston transport as you wish by passing a JSON argument (like in a config file)
It is made for easily changing parameters for logging when changing environnement without touching the logging code

### Usage

```sh
var Logger = require('winston-wrapper')
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
var mylogger = Logger(conf)
```
This will instantiate a logger with 3 transports.
  - Type : the name of the transport to use.
  - opts : the options supported by the transport defined by Type.
  
View [here](https://github.com/winstonjs/winston/blob/master/docs/transports.md#winston-core) to see all type and all options.
### Advanced Usage

If you wish to use non standard winston transport, or even your own, you just have to require the module before passing the JSON.
```sh
var Logger = require('winston-wrapper')
var Mail = require('winston-mail').Mail //expose winston.Transports.Mail

var conf = {
    mail: {
    type: 'Mail',
    opts: {
      to: 'toto@example.vcom',
      from: 'tata@example.com',
      ...
    },
    ...
}
var mylogger = Logger(conf)
```

