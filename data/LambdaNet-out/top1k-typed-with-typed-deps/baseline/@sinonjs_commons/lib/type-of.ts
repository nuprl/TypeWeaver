"use strict";

var type: Function = require("type-detect");

/**
 * Returns the lower-case result of running type from type-detect on the value
 *
 * @param  {*} value
 * @returns {string}
 */
module.exports = function typeOf(value: String): String {
    return type(value).toLowerCase();
};
