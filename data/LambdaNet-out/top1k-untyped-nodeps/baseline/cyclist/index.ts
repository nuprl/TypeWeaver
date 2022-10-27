var twoify: Function = function (n: Number) {
  if (n && !(n & (n - 1))) return n
  var p: Number = 1
  while (p < n) p <<= 1
  return p
}

var Cyclist: Function = function (size: Number) {
  if (!(this instanceof Cyclist)) return new Cyclist(size)
  size = twoify(size)
  this.mask = size - 1
  this.size = size
  this.values = new Array(size)
}

Cyclist.prototype.put = function (index: Number, val: String) {
  var pos: Number = index & this.mask
  this.values[pos] = val
  return pos
}

Cyclist.prototype.get = function (index: Number) {
  return this.values[index & this.mask]
}

Cyclist.prototype.del = function (index: Number) {
  var pos: Number = index & this.mask
  var val: String = this.values[pos]
  this.values[pos] = undefined
  return val
}

module.exports = Cyclist
