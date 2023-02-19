"use strict";

/**
 * Returns a string representation of the value
 *
 * @param  {*} value
 * @returns {string}
 */
function valueToString(value: any) {
    if (value && value.toString) {
        // eslint-disable-next-line @sinonjs/no-prototype-methods/no-prototype-methods
        return value.toString();
    }
    return String(value);
}

module.exports = valueToString;