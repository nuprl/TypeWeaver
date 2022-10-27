import connect from 'connect';
var server: HTMLElement = connect.createServer();
server.use(connect.static(__dirname));

import browserify from 'browserify';
var bundle: String = browserify(__dirname + '/js/main.js', { mount: '/js/browserify.js' });
server.use(bundle);

var port: Number = parseInt(process.argv[2] || 8080, 10);
server.listen(port);
console.log('Listening on :' + port);
