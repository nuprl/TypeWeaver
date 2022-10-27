
/**
 * Module dependencies.
 */

var ProgressBar: Object = require('../');

var bar: Object = new ProgressBar('  :bar :title', { total: 10 });

var id: Number = setInterval(function(){
  var randomTitle: String = ['some', 'random', 'title'][Math.random() * 3 | 0];
  bar.tick({ title: randomTitle });
  if (bar.complete) {
    clearInterval(id);
    bar2();
  }
}, 100);

function bar2(): Void {
  var bar: Object = new ProgressBar('  processing: [:bar]', {
      total: 15
    , complete: '*'
    , incomplete: ' '
  });

  var id: Number = setInterval(function(){
    bar.tick();
    if (bar.complete) {
      clearInterval(id);
      bar3();
    }
  }, 100);
}

function bar3(): Void {
  var bar: Object = new ProgressBar('  download |:bar| :percent', {
      complete: '='
    , incomplete: ' '
    , width: 40
    , total: 20
  });

  var id: Number = setInterval(function(){
    bar.tick();
    if (bar.complete) {
      clearInterval(id);
      bar4();
    }
  }, 100);
}

function bar4(): Void {
  var bar: Object = new ProgressBar('  :current of :total :percent', {
    total: 20
  });

  var id: Number = setInterval(function(){
    bar.tick();
    if (bar.complete) {
      clearInterval(id);
      bar5();
    }
  }, 100);
}

function bar5(): Void {
  var bar: Object = new ProgressBar('  [:bar] :elapseds elapsed, eta :etas', {
      width: 8
    , total: 50
  });

  var id: Number = setInterval(function(){
    bar.tick();
    if (bar.complete) {
      clearInterval(id);
    }
  }, 300);
}
