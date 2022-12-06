import ProgressBar from '../';
var bar: object         = new ProgressBar('  [:bar]', 10);

var id: number = setInterval(function (){
  bar.tick();
  if (bar.complete) {
    clearInterval(id);
  }
}, 100);
