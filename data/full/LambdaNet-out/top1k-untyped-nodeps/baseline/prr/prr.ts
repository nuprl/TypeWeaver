/*!
  * prr
  * (c) 2013 Rod Vagg <rod@vagg.org>
  * https://github.com/rvagg/prr
  * License: MIT
  */

(function (name: string, context: object, definition: Function) {
  if (typeof module != 'undefined' && module.exports)
    module.exports = definition()
  else
    context[name] = definition()
})('prr', this, function() {

  var setProperty: Function = typeof Object.defineProperty == 'function'
      ? function (obj: any[], key: string, options: object) {
          Object.defineProperty(obj, key, options)
          return obj
        }
      : function (obj: object, key: string, options: object) { // < es5
          obj[key] = options.value
          return obj
        }

    , makeOptions: Function = function (value: string, options: any[]) {
        var oo: boolean = typeof options == 'object'
          , os: boolean = !oo && typeof options == 'string'
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

    , prr: Function = function (obj: any[], key: Function, value: string, options: object) {
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