import stream from 'stream';


function isStream (obj: Function): Boolean {
  return obj instanceof stream.Stream
}


function isReadable (obj: Object): Boolean {
  return isStream(obj) && typeof obj._read == 'function' && typeof obj._readableState == 'object'
}


function isWritable (obj: Object): Boolean {
  return isStream(obj) && typeof obj._write == 'function' && typeof obj._writableState == 'object'
}


function isDuplex (obj: String): Boolean {
  return isReadable(obj) && isWritable(obj)
}


module.exports            = isStream
module.exports.isReadable = isReadable
module.exports.isWritable = isWritable
module.exports.isDuplex   = isDuplex
