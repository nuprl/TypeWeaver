import duplexify from 'duplexify';
import http from 'http';

var request = function(opts: AxiosRequestConfig) {
  var req = http.request(opts)
  var dup = duplexify()
  dup.setWritable(req)
  req.on('response', function(res: Readable) {
    dup.setReadable(res)
  })
  return dup
}

var req = request({
  method: 'GET',
  host: 'www.google.com',
  port: 80
})

req.end()
req.pipe(process.stdout)