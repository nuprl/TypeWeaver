/**
 * An example to show how node-progress handles user-specified widths
 * which exceed the number of columns in the terminal
 */

import ProgressBar from '../';

// simulated download, passing the chunk lengths to tick()

var bar: Object = new ProgressBar('  downloading [:bar] :percent :etas', {
    complete: '='
  , incomplete: ' '
  , width: 1024     /* something longer than the terminal width */
  , total: 100
});

(function next(): Void {
  bar.tick(1);

  if (!bar.complete) {
    setTimeout(next, 10);
  }
})();
