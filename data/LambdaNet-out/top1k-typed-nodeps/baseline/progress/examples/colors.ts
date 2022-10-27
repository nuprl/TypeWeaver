var green: String = '\u001b[42m \u001b[0m';
var red: String = '\u001b[41m \u001b[0m';

var ProgressBar: Array = require('../');

var bar: Object = new ProgressBar('  [:bar]', {
  complete: green,
  incomplete: red,
  total: 20
});

var id: Number = setInterval(function (){
  bar.tick();
  if (bar.complete) {
    clearInterval(id);
  }
}, 100);
