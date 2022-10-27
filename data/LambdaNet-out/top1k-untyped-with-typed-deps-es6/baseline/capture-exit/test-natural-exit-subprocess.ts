'use strict';

import capture from './';
capture.captureExit();

capture.onExit(function () {
  console.log('onExit');
})

process.on('exit', function () {
  console.log('exit');
});
