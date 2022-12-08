import connect from 'connect';
var server = connect.createServer();
server.use(connect.static(__dirname));

import browserify from 'browserify';
var bundle = browserify(__dirname + '/js/main.js', { mount: '/js/browserify.js' });
server.use(bundle);

var port = parseInt(process.argv[2] || 8080, 10);
server.listen(port);
console.log('Listening on :' + port);