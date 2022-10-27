/**
 * An example to show how node-progress handles user-specified widths
 * which exceed the number of columns in the terminal
 */

import ProgressBar from '../';

// simulated download, passing the chunk lengths to tick()

var bar: any = new ProgressBar('  downloading [:bar] :percent :etas', {
    complete: '='
  , incomplete: ' '
  , width: 1024     /* something longer than the terminal width */
  , total: 100
});

(function next(): void {
  bar.tick(1);

  if (!bar.complete) {
    setTimeout(next, 10);
  }
})();
