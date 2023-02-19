"use strict";
const legacyErrorCodes: string = require("./legacy-error-codes.json");
const idlUtils: string = require("./utils.js");

exports.implementation = class DOMExceptionImpl {
  constructor(globalObject, [message, name]) {
    this.name = name;
    this.message = message;
  }

  get code() {
    return legacyErrorCodes[this.name] || 0;
  }
};

// A proprietary V8 extension that causes the stack property to appear.
exports.init = (impl: boolean) => {
  if (Error.captureStackTrace) {
    const wrapper: object = idlUtils.wrapperForImpl(impl);
    Error.captureStackTrace(wrapper, wrapper.constructor);
  }
};
