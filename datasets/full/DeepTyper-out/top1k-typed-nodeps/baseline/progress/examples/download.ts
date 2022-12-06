
/**
 * Module dependencies.
 */

var ProgressBar: any = require('../');

// simulated download, passing the chunk lengths to tick()

var contentLength: number = 128 * 1024;

var bar: any = new ProgressBar('  downloading [:bar] :percent :etas', {
    complete: '='
  , incomplete: ' '
  , width: 20
  , total: contentLength
});

(function next(): void {
  if (contentLength) {
    var chunk: number = Math.random() * 10 * 1024;
    bar.tick(chunk);

    if (!bar.complete) {
      setTimeout(next, Math.random() * 1000);
    }
  }
})();
