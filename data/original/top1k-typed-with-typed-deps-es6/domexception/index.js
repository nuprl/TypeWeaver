"use strict";
import DOMException from './webidl2js-wrapper.js';

const sharedGlobalObject = { Array, Error, Object, Promise, String, TypeError };
DOMException.install(sharedGlobalObject, ["Window"]);

export default sharedGlobalObject.DOMException;
