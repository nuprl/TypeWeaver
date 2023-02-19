var green: string = '\u001b[42m \u001b[0m';
var red: string = '\u001b[41m \u001b[0m';

var ProgressBar: any = require('../');

var bar: any = new ProgressBar('  [:bar]', {
  complete: green,
  incomplete: red,
  total: 20
});

var id: number = setInterval(function (){
  bar.tick();
  if (bar.complete) {
    clearInterval(id);
  }
}, 100);
