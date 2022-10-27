"use strict";

/**
 * A reference to the global object
 *
 * @type {object} globalObject
 */
var globalObject: String;

/* istanbul ignore else */
if (typeof global !== "undefined") {
    // Node
    globalObject = global;
} else if (typeof window !== "undefined") {
    // Browser
    globalObject = window;
} else {
    // WebWorker
    globalObject = self;
}

export default globalObject;
