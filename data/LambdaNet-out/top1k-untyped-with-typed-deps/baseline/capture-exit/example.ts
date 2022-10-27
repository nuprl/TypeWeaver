// remove the next line, and "cleanup" prints.
//

var exit: Array = require('./');
exit.captureExit();
require('ora')('Loading unicorns').start().stop();

exit.onExit(function() {
  console.log('wat');
  return new Promise(function(resolve: Function) {
    console.log('waiting');
    setTimeout(function() {
      console.log('complete!');
    }, 1000);
  })
});

process.on('SIGINT', function() {
  // never called if ora was ever enabled
  console.log('cleanup');
});

process.kill(process.pid, 'SIGINT');
