var twoify: any = function (n: any) {
  if (n && !(n & (n - 1))) return n
  var p: number = 1
  while (p < n) p <<= 1
  return p
}

var Cyclist: any = function (size: any) {
  if (!(this instanceof Cyclist)) return new Cyclist(size)
  size = twoify(size)
  this.mask = size - 1
  this.size = size
  this.values = new Array(size)
}

Cyclist.prototype.put = function (index: any, val: any) {
  var pos: any = index & this.mask
  this.values[pos] = val
  return pos
}

Cyclist.prototype.get = function (index: any) {
  return this.values[index & this.mask]
}

Cyclist.prototype.del = function (index: any) {
  var pos: any = index & this.mask
  var val: any = this.values[pos]
  this.values[pos] = undefined
  return val
}

module.exports = Cyclist
