var ecstatic: any[] = require('ecstatic')(__dirname);
var http: string = require('http');
http.createServer(ecstatic).listen(8000);

console.log('listening on :8000');
console.log('# remember to run browserify entry.js -o bundle.js');
