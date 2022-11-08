// not "use strict" so we can declare global "Promise"

import asap from 'asap';

if (typeof Promise === 'undefined') {
  Promise = require('./lib/core.js')
  require('./lib/es6-extensions.js')
}

import './polyfill-done.js';