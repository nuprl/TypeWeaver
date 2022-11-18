var twoify: Function = function (n: number) {
  if (n && !(n & (n - 1))) return n
  var p: number = 1
  while (p < n) p <<= 1
  return p
}

var Cyclist: Function = function (size: number) {
  if (!(this instanceof Cyclist)) return new Cyclist(size)
  size = twoify(size)
  this.mask = size - 1
  this.size = size
  this.values = new Array(size)
}

Cyclist.prototype.put = function (index: number, val: string) {
  var pos: number = index & this.mask
  this.values[pos] = val
  return pos
}

Cyclist.prototype.get = function (index: number) {
  return this.values[index & this.mask]
}

Cyclist.prototype.del = function (index: number) {
  var pos: number = index & this.mask
  var val: string = this.values[pos]
  this.values[pos] = undefined
  return val
}

export default Cyclist;
