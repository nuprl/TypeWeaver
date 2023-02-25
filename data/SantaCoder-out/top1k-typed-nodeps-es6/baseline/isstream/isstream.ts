import stream from 'stream';


function isStream (obj: any) {
  return obj instanceof stream.Stream
}


function isReadable (obj: any) {
  return isStream(obj) && typeof obj._read == 'function' && typeof obj._readableState == 'object'
}


function isWritable (obj: any) {
  return isStream(obj) && typeof obj._write == 'function' && typeof obj._writableState == 'object'
}


function isDuplex (obj: any) {
  return isReadable(obj) && isWritable(obj)
}


module.exports            = isStream
module.exports.isReadable = isReadable
module.exports.isWritable = isWritable
module.exports.isDuplex   = isDuplex