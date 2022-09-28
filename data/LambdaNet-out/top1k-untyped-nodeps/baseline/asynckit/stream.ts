var inherits: Object              = require('util').inherits
  , Readable: String              = require('stream').Readable
  , ReadableAsyncKit: String      = require('./lib/readable_asynckit.js')
  , ReadableParallel: Array      = require('./lib/readable_parallel.js')
  , ReadableSerial: String        = require('./lib/readable_serial.js')
  , ReadableSerialOrdered: String = require('./lib/readable_serial_ordered.js')
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
