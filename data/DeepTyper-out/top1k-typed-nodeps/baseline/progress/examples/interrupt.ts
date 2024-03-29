/**
 * An example to show a progress bar being interrupted,
 * displaying messages above the bar while keeping the
 * progress intact
 */

var ProgressBar: any = require('../');

var bar: any = new ProgressBar(':bar :current/:total', { total: 10 });
var timer: any = setInterval(function () {
    bar.tick();
    if (bar.complete) {
        clearInterval(timer);
    } else if (bar.curr === 5 || bar.curr === 8) {
        bar.interrupt('interrupt: current progress is ' + bar.curr + '/' + bar.total);
    }
}, 1000);
