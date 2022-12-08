import { inherits } from 'util';
import { Readable } from 'stream';
import ReadableAsyncKit from './lib/readable_asynckit.js';
import ReadableParallel from './lib/readable_parallel.js';
import ReadableSerial from './lib/readable_serial.js';
import ReadableSerialOrdered from './lib/readable_serial_ordered.js';

// API
export default {
  parallel      : ReadableParallel,
  serial        : ReadableSerial,
  serialOrdered : ReadableSerialOrdered, 
};

inherits(ReadableAsyncKit, Readable);

inherits(ReadableParallel, ReadableAsyncKit);
inherits(ReadableSerial, ReadableAsyncKit);
inherits(ReadableSerialOrdered, ReadableAsyncKit);
