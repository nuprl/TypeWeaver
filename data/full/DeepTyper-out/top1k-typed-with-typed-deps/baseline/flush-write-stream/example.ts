var writer: any = require('./')

var ws: any = writer(write, flush)

ws.on('finish', function () {
  console.log('finished')
})

ws.write('hello')
ws.write('world')
ws.end()

function write (data: any, enc: any, cb: any): void {
  // i am your normal ._write method
  console.log('writing', data.toString())
  cb()
}

function flush (cb: any): void {
  // i am called before finish is emitted
  setTimeout(cb, 1000) // wait 1 sec
}
