import writer from './';

var ws = writer(write, flush)

ws.on('finish', function () {
  console.log('finished')
})

ws.write('hello')
ws.write('world')
ws.end()

function write (data: any, enc: string, cb: Function) {
  // i am your normal ._write method
  console.log('writing', data.toString())
  cb()
}

function flush (cb: Function) {
  // i am called before finish is emitted
  setTimeout(cb, 1000) // wait 1 sec
}