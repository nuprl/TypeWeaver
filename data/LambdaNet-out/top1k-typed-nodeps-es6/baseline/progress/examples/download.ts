
/**
 * Module dependencies.
 */

import ProgressBar from '../';

// simulated download, passing the chunk lengths to tick()

var contentLength: number = 128 * 1024;

var bar: object = new ProgressBar('  downloading [:bar] :percent :etas', {
    complete: '='
  , incomplete: ' '
  , width: 20
  , total: contentLength
});

(function next(): Void {
  if (contentLength) {
    var chunk: number = Math.random() * 10 * 1024;
    bar.tick(chunk);

    if (!bar.complete) {
      setTimeout(next, Math.random() * 1000);
    }
  }
})();
