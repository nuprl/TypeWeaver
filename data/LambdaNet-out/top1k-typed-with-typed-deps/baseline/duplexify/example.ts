var duplexify: Function = require('duplexify')
var http: string = require('http')

var request: Function = function(opts: string) {
  var req: string = http.request(opts)
  var dup: HTMLElement = duplexify()
  dup.setWritable(req)
  req.on('response', function(res: string) {
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
