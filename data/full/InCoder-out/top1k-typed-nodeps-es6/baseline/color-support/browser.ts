export default colorSupport({ alwaysReturn: true }, colorSupport);

function colorSupport(options: ColorOptions,  obj: ColorObject) {
  obj = obj || {}
  options = options || {}
  obj.level = 0
  obj.hasBasic = false
  obj.has256 = false
  obj.has16m = false
  if (!options.alwaysReturn) {
    return false
  }
  return obj
}