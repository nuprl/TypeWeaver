var connect: any = require('connect');
var server: any = connect.createServer();
server.use(connect.static(__dirname));

var browserify: any = require('browserify');
var bundle: any = browserify(__dirname + '/js/main.js', { mount: '/js/browserify.js' });
server.use(bundle);

var port: number = parseInt(process.argv[2] || 8080, 10);
server.listen(port);
console.log('Listening on :' + port);
