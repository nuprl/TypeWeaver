/*!
  * prr
  * (c) 2013 Rod Vagg <rod@vagg.org>
  * https://github.com/rvagg/prr
  * License: MIT
  */

(function (name: String, context: Object, definition: Function) {
  if (typeof module != 'undefined' && module.exports)
    module.exports = definition()
  else
    context[name] = definition()
})('prr', this, function() {

  var setProperty: Function = typeof Object.defineProperty == 'function'
      ? function (obj: Array, key: String, options: Object) {
          Object.defineProperty(obj, key, options)
          return obj
        }
      : function (obj: Object, key: String, options: Object) { // < es5
          obj[key] = options.value
          return obj
        }

    , makeOptions: Function = function (value: String, options: Array) {
        var oo: Boolean = typeof options == 'object'
          , os: Boolean = !oo && typeof options == 'string'
          , op: Function = function (p: Promise) {
              return oo
                ? !!options[p]
                : os
                  ? options.indexOf(p[0]) > -1
                  : false
            }

        return {
            enumerable   : op('enumerable')
          , configurable : op('configurable')
          , writable     : op('writable')
          , value        : value
        }
      }

    , prr: Function = function (obj: Array, key: Function, value: String, options: Object) {
        var k: Function

        options = makeOptions(value, options)

        if (typeof key == 'object') {
          for (k in key) {
            if (Object.hasOwnProperty.call(key, k)) {
              options.value = key[k]
              setProperty(obj, k, options)
            }
          }
          return obj
        }

        return setProperty(obj, key, options)
      }

  return prr
})