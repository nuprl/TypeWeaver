import ecstaticFactory from 'ecstatic';
const ecstatic: String = ecstaticFactory(__dirname);
import http from 'http';
http.createServer(ecstatic).listen(8000);

console.log('listening on :8000');
console.log('# remember to run browserify entry.js -o bundle.js');
