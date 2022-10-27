
/**
 * Module dependencies.
 */

import ProgressBar from '../';

// simulated download, passing the chunk lengths to tick()

var contentLength: Number = 128 * 1024;

var bar: Object = new ProgressBar('  downloading [:bar] :percent :etas', {
    complete: '='
  , incomplete: ' '
  , width: 20
  , total: contentLength
});

(function next(): Void {
  if (contentLength) {
    var chunk: Number = Math.random() * 10 * 1024;
    bar.tick(chunk);

    if (!bar.complete) {
      setTimeout(next, Math.random() * 1000);
    }
  }
})();
