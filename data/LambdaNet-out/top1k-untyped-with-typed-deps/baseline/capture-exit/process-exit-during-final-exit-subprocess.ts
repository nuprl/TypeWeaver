'use strict';

// capture-exit-onExit.js
var captureExit: Array = require('.');
captureExit.captureExit();

process.on('exit', function() {
  process.exit(1);
});

process.exit(0);
