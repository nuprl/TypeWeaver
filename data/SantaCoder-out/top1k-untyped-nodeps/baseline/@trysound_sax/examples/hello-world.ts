require('http').createServer(function (req: http.IncomingMessage, res: http.ServerResponse) {
  res.writeHead(200, {'content-type': 'application/json'})
  res.end(JSON.stringify({ok: true}))
}).listen(1337)