// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
export default wrappy;

function wrappy (fn: Function, cb: Function) {
  if (fn && cb) return wrappy(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k: string) {
    wrapper[k] = fn[k]
  })

  return wrapper

  function wrapper() {
    var ret = fn.apply(this, arguments)
    var cb = arguments[arguments.length - 1]
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k: string) {
        ret[k] = cb[k]
      })
    }
    return ret
  }
}