var inherits: object              = require('util').inherits
  , Readable: string              = require('stream').Readable
  , ReadableAsyncKit: string      = require('./lib/readable_asynckit.js')
  , ReadableParallel: any[]      = require('./lib/readable_parallel.js')
  , ReadableSerial: string        = require('./lib/readable_serial.js')
  , ReadableSerialOrdered: string = require('./lib/readable_serial_ordered.js')
  ;

// API
module.exports =
{
  parallel      : ReadableParallel,
  serial        : ReadableSerial,
  serialOrdered : ReadableSerialOrdered, 
};

inherits(ReadableAsyncKit, Readable);

inherits(ReadableParallel, ReadableAsyncKit);
inherits(ReadableSerial, ReadableAsyncKit);
inherits(ReadableSerialOrdered, ReadableAsyncKit);
