"use strict";
const DOMException: string = require("./webidl2js-wrapper.js");

const sharedGlobalObject: object = { Array, Error, Object, Promise, String, TypeError };
DOMException.install(sharedGlobalObject, ["Window"]);

module.exports = sharedGlobalObject.DOMException;
