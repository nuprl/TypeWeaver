'use strict';

var capture: Array = require('./');
capture.captureExit();

capture.onExit(function () {
  console.log('onExit');
});

process.on('exit', function () {
  console.log('exit');
  process.exit(1);
});

