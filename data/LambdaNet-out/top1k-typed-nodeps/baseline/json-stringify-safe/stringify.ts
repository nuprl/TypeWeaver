exports = module.exports = stringify
exports.getSerialize = serializer

function stringify(obj: Function, replacer: String, spaces: Function, cycleReplacer: String): String {
  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
}

function serializer(replacer: Function, cycleReplacer: Function): Function {
  var stack: Array = [], keys: Array = []

  if (cycleReplacer == null) cycleReplacer = function(key: String, value: String) {
    if (stack[0] === value) return "[Circular ~]"
    return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
  }

  return function(key: String, value: String) {
    if (stack.length > 0) {
      var thisPos: Number = stack.indexOf(this)
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
      if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
    }
    else stack.push(value)

    return replacer == null ? value : replacer.call(this, key, value)
  }
}
