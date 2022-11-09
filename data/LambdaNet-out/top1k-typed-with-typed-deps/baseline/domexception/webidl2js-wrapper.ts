"use strict";
const DOMException: String = require("./lib/DOMException.js");

// Special install function to make the DOMException inherit from Error.
// https://heycam.github.io/webidl/#es-DOMException-specialness
function installOverride(globalObject: Object, globalNames: Number): Void {
  if (typeof globalObject.Error !== "function") {
    throw new Error("Internal error: Error constructor is not present on the given global object.");
  }

  DOMException.install(globalObject, globalNames);
  Object.setPrototypeOf(globalObject.DOMException.prototype, globalObject.Error.prototype);
}

module.exports = { ...DOMException, install: installOverride };
