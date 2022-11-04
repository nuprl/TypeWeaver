/* eslint-disable no-console */
"use strict";

/**
 * Returns a function that will invoke the supplied function and print a
 * deprecation warning to the console each time it is called.
 *
 * @param  {Function} func
 * @param  {string} msg
 * @returns {Function}
 */
export const wrap: Function = function(func: Object, msg: String) {
    var wrapped: Function = function() {
        printWarning(msg);
        return func.apply(this, arguments);
    };
    if (func.prototype) {
        wrapped.prototype = func.prototype;
    }
    return wrapped;
};

/**
 * Returns a string which can be supplied to `wrap()` to notify the user that a
 * particular part of the sinon API has been deprecated.
 *
 * @param  {string} packageName
 * @param  {string} funcName
 * @returns {string}
 */
export const defaultMsg: Function = function(packageName: String, funcName: String) {
    return (
        packageName +
        "." +
        funcName +
        " is deprecated and will be removed from the public API in a future version of " +
        packageName +
        "."
    );
};

/**
 * Prints a warning on the console, when it exists
 *
 * @param  {string} msg
 * @returns {undefined}
 */
export const printWarning: Function = function(msg: String) {
    /* istanbul ignore next */
    if (typeof process === "object" && process.emitWarning) {
        // Emit Warnings in Node
        process.emitWarning(msg);
    } else if (console.info) {
        console.info(msg);
    } else {
        console.log(msg);
    }
};