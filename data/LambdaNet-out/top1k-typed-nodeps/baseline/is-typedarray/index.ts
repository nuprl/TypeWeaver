module.exports      = isTypedArray
isTypedArray.strict = isStrictTypedArray
isTypedArray.loose  = isLooseTypedArray

var toString: Function = Object.prototype.toString
var names: object = {
    '[object Int8Array]': true
  , '[object Int16Array]': true
  , '[object Int32Array]': true
  , '[object Uint8Array]': true
  , '[object Uint8ClampedArray]': true
  , '[object Uint16Array]': true
  , '[object Uint32Array]': true
  , '[object Float32Array]': true
  , '[object Float64Array]': true
}

function isTypedArray(arr: string): boolean {
  return (
       isStrictTypedArray(arr)
    || isLooseTypedArray(arr)
  )
}

function isStrictTypedArray(arr: string): boolean {
  return (
       arr instanceof Int8Array
    || arr instanceof Int16Array
    || arr instanceof Int32Array
    || arr instanceof Uint8Array
    || arr instanceof Uint8ClampedArray
    || arr instanceof Uint16Array
    || arr instanceof Uint32Array
    || arr instanceof Float32Array
    || arr instanceof Float64Array
  )
}

function isLooseTypedArray(arr: string): string {
  return names[toString.call(arr)]
}
