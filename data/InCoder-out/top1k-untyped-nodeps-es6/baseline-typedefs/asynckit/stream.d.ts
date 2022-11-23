import ReadableParallel from './lib/readable_parallel.js';
import ReadableSerial from './lib/readable_serial.js';
import ReadableSerialOrdered from './lib/readable_serial_ordered.js';
declare const _default: {
    parallel: typeof ReadableParallel;
    serial: typeof ReadableSerial;
    serialOrdered: typeof ReadableSerialOrdered;
};
export default _default;
