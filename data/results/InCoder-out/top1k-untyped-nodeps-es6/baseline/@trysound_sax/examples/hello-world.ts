require('http').createServer(function (req: express.Request,  res: express.Response) {
  res.writeHead(200, {'content-type': 'application/json'})
  res.end(JSON.stringify({ok: true}))
}).listen(1337)