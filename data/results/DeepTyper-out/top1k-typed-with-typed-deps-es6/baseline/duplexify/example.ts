import duplexify from 'duplexify';
import http from 'http';

var request: any = function(opts: any) {
  var req: any = http.request(opts)
  var dup: any = duplexify()
  dup.setWritable(req)
  req.on('response', function(res: any) {
    dup.setReadable(res)
  })
  return dup
}

var req: any = request({
  method: 'GET',
  host: 'www.google.com',
  port: 80
})

req.end()
req.pipe(process.stdout)
