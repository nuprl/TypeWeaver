/**
 * A simple progressbar with synchronous calls to tick()
 * (i.e. no setTimeout/setInterval)
 */

var ProgressBar: Array = require('../');

var len: Number = 10000000; // Adjust to your machine's speed
var bar: HTMLElement = new ProgressBar('[:bar]', {total: len, renderThrottle: 100});

for (var i = 0; i <= len; i++) {
  bar.tick();
}