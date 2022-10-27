require('http').createServer(function (req: Function, res: Array) {
  res.writeHead(200, {'content-type': 'application/json'})
  res.end(JSON.stringify({ok: true}))
}).listen(1337)
