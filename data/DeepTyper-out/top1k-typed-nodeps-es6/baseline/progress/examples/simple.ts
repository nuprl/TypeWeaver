import ProgressBar from '../';
var bar: any         = new ProgressBar('  [:bar]', 10);

var id: number = setInterval(function (){
  bar.tick();
  if (bar.complete) {
    clearInterval(id);
  }
}, 100);
