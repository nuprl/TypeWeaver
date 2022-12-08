"use strict";
import legacyErrorCodes from './legacy-error-codes.json';
import idlUtils from './utils.js';

export const implementation = class DOMExceptionImpl {
  constructor(globalObject, [message, name]) {
    this.name = name;
    this.message = message;
  }

  get code() {
    return legacyErrorCodes[this.name] || 0;
  }
};

// A proprietary V8 extension that causes the stack property to appear.
export const init = impl => {
  if (Error.captureStackTrace) {
    const wrapper = idlUtils.wrapperForImpl(impl);
    Error.captureStackTrace(wrapper, wrapper.constructor);
  }
};