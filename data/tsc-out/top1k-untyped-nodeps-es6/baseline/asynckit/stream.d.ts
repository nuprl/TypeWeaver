declare namespace _default {
    export { ReadableParallel as parallel };
    export { ReadableSerial as serial };
    export { ReadableSerialOrdered as serialOrdered };
}
export default _default;
import ReadableParallel from "./lib/readable_parallel.js";
import ReadableSerial from "./lib/readable_serial.js";
import ReadableSerialOrdered from "./lib/readable_serial_ordered.js";
