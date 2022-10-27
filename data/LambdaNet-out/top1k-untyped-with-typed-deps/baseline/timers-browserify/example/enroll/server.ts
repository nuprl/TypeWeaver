var connect: Array = require('connect');
var server: Array = connect.createServer();
server.use(connect.static(__dirname));

var browserify: Function = require('browserify');
var bundle: Array = browserify(__dirname + '/js/main.js', { mount: '/js/browserify.js' });
server.use(bundle);

var port: Number = parseInt(process.argv[2] || 8080, 10);
server.listen(port);
console.log('Listening on :' + port);
