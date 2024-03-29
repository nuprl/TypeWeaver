/*!
  * prr
  * (c) 2013 Rod Vagg <rod@vagg.org>
  * https://github.com/rvagg/prr
  * License: MIT
  */

(function (name: String,  context: Context,  definition: Definition) {
  if (typeof module != 'undefined' && module.exports)
    module.exports = definition()
  else
    context[name] = definition()
})('prr', this, function() {

  var setProperty = typeof Object.defineProperty == 'function'
      ? function (obj: any,  key: any,  options: any) {
          Object.defineProperty(obj, key, options)
          return obj
        }
      : function (obj: any,  key: any,  options: any) { // < es5
          obj[key] = options.value
          return obj
        }

    , makeOptions = function (value: any,  options: any) {
        var oo = typeof options == 'object'
          , os = !oo && typeof options == 'string'
          , op = function (p: y) {
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

    , prr = function (obj: any,  key: any,  value: any,  options: any) {
        var k

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