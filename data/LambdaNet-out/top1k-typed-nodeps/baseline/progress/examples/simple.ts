var ProgressBar: Array = require('../')
  , bar: Object         = new ProgressBar('  [:bar]', 10);

var id: Number = setInterval(function (){
  bar.tick();
  if (bar.complete) {
    clearInterval(id);
  }
}, 100);
