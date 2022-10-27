var duplexify: Function = require('duplexify')
var http: String = require('http')

var request: Function = function(opts: String) {
  var req: String = http.request(opts)
  var dup: HTMLElement = duplexify()
  dup.setWritable(req)
  req.on('response', function(res: String) {
    dup.setReadable(res)
  })
  return dup
}

var req: HTMLElement = request({
  method: 'GET',
  host: 'www.google.com',
  port: 80
})

req.end()
req.pipe(process.stdout)
