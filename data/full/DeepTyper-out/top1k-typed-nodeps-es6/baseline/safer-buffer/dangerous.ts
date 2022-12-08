/* eslint-disable node/no-deprecated-api */

'use strict'

import buffer from 'buffer';
var Buffer: any = buffer.Buffer
import safer from './safer.js';
var Safer: any = safer.Buffer

var dangerous: {} = {}

var key: any

for (key in safer) {
  if (!safer.hasOwnProperty(key)) continue
  dangerous[key] = safer[key]
}

var Dangereous: any = dangerous.Buffer = {}

// Copy Safer API
for (key in Safer) {
  if (!Safer.hasOwnProperty(key)) continue
  Dangereous[key] = Safer[key]
}

// Copy those missing unsafe methods, if they are present
for (key in Buffer) {
  if (!Buffer.hasOwnProperty(key)) continue
  if (Dangereous.hasOwnProperty(key)) continue
  Dangereous[key] = Buffer[key]
}

if (!Dangereous.allocUnsafe) {
  Dangereous.allocUnsafe = function (size: any) {
    if (typeof size !== 'number') {
      throw new TypeError('The "size" argument must be of type number. Received type ' + typeof size)
    }
    if (size < 0 || size >= 2 * (1 << 30)) {
      throw new RangeError('The value "' + size + '" is invalid for option "size"')
    }
    return Buffer(size)
  }
}

if (!Dangereous.allocUnsafeSlow) {
  Dangereous.allocUnsafeSlow = function (size: any) {
    if (typeof size !== 'number') {
      throw new TypeError('The "size" argument must be of type number. Received type ' + typeof size)
    }
    if (size < 0 || size >= 2 * (1 << 30)) {
      throw new RangeError('The value "' + size + '" is invalid for option "size"')
    }
    return buffer.SlowBuffer(size)
  }
}

export default dangerous;
