
/**
 * Module dependencies.
 * Example to increase and decrease the value of a progress bar
 * to show the functionality of `terminate()`.
 */

import ProgressBar from '../';

var bar: HTMLElement = new ProgressBar('  :title [:bar] :percent', {
    complete: '='
  , incomplete: ' '
  , width: 30
  , total: 100
});

function forward(): void {
  bar.tick(1, { title: 'forward ' });
  if (bar.curr > 60) {
    backward();
  } else {
    setTimeout(forward, 20);
  }
}

function backward(): void {
  bar.tick(-1, { title: 'backward' });
  if (bar.curr == 0) {
    bar.terminate();
  } else {
    setTimeout(backward, 20);
  }
}

forward();
