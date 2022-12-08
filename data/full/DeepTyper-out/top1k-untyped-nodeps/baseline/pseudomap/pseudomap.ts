var hasOwnProperty: any = Object.prototype.hasOwnProperty

export default PseudoMap;

function PseudoMap (set): void {
  if (!(this instanceof PseudoMap)) // whyyyyyyy
    throw new TypeError("Constructor PseudoMap requires 'new'")

  this.clear()

  if (set) {
    if ((set instanceof PseudoMap) ||
        (typeof Map === 'function' && set instanceof Map))
      set.forEach(function (value: any, key: string) {
        this.set(key, value)
      }, this)
    else if (Array.isArray(set))
      set.forEach(function (kv: string[]) {
        this.set(kv[0], kv[1])
      }, this)
    else
      throw new TypeError('invalid argument')
  }
}

PseudoMap.prototype.forEach = function (fn: any, thisp: any) {
  thisp = thisp || this
  Object.keys(this._data).forEach(function (k: string) {
    if (k !== 'size')
      fn.call(thisp, this._data[k].value, this._data[k].key)
  }, this)
}

PseudoMap.prototype.has = function (k: string) {
  return !!find(this._data, k)
}

PseudoMap.prototype.get = function (k: string) {
  var res: any = find(this._data, k)
  return res && res.value
}

PseudoMap.prototype.set = function (k: any, v: any) {
  set(this._data, k, v)
}

PseudoMap.prototype.delete = function (k: any) {
  var res: any = find(this._data, k)
  if (res) {
    delete this._data[res._index]
    this._data.size--
  }
}

PseudoMap.prototype.clear = function () {
  var data: any = Object.create(null)
  data.size = 0

  Object.defineProperty(this, '_data', {
    value: data,
    enumerable: false,
    configurable: true,
    writable: false
  })
}

Object.defineProperty(PseudoMap.prototype, 'size', {
  get: function () {
    return this._data.size
  },
  set: function (n: any) {},
  enumerable: true,
  configurable: true
})

PseudoMap.prototype.values =
PseudoMap.prototype.keys =
PseudoMap.prototype.entries = function () {
  throw new Error('iterators are not implemented in this version')
}

// Either identical, or both NaN
function same (a: any, b: any): void {
  return a === b || a !== a && b !== b
}

function Entry (k: any, v: any, i: number): void {
  this.key = k
  this.value = v
  this._index = i
}

function find (data: any, k: any): any {
  for (var i = 0, s = '_' + k, key = s;
       hasOwnProperty.call(data, key);
       key = s + i++) {
    if (same(data[key].key, k))
      return data[key]
  }
}

function set (data: any, k: any, v: any) {
  for (var i = 0, s = '_' + k, key = s;
       hasOwnProperty.call(data, key);
       key = s + i++) {
    if (same(data[key].key, k)) {
      data[key].value = v
      return
    }
  }
  data.size++
  data[key] = new Entry(k, v, key)
}
