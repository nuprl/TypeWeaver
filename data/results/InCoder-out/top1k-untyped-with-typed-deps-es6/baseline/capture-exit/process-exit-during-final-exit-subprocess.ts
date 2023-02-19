'use strict';

// capture-exit-onExit.js
import captureExit from '.';

captureExit.captureExit();

process.on('exit', function() {
  process.exit(1);
});

process.exit(0);