var util = require('util')

module.exports = function () {
  var args = Array.prototype.slice.call(arguments, 0)
  args.forEach(function (arg: any) {
    if (!arg) {
      throw new TypeError('Bad arguments.')
    }
  })
  return util.format.apply(null, arguments)
}