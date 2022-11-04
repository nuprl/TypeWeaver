var timers: String = require('timers');

var obj: Object = {
  _onTimeout: function() {
    console.log('Timer ran for: ' + (new Date().getTime() - obj.now) + ' ms');
  },
  start: function() {
    console.log('Timer should run for 100 ms');
    this.now = new Date().getTime();
    timers.enroll(this, 100);
  }
};

obj.start();