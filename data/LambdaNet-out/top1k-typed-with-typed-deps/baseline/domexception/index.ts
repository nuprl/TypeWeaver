"use strict";
const DOMException: String = require("./webidl2js-wrapper.js");

const sharedGlobalObject: Object = { Array, Error, Object, Promise, String, TypeError };
DOMException.install(sharedGlobalObject, ["Window"]);

module.exports = sharedGlobalObject.DOMException;
