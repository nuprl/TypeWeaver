var hasOwnProperty = Object.prototype.hasOwnProperty

export default PseudoMap;

function PseudoMap (set: Set<string>) {
  if (!(this instanceof PseudoMap)) // whyyyyyyy
    throw new TypeError("Constructor PseudoMap requires 'new'")

  this.clear()

  if (set) {
    if ((set instanceof PseudoMap) ||
        (typeof Map === 'function' && set instanceof Map))
      set.forEach(function (value: any,  key: any) {
        this.set(key, value)
      }, this)
    else if (Array.isArray(set))
      set.forEach(function (kv: Array<string, string>) {
        this.set(kv[0], kv[1])
      }, this)
    else
      throw new TypeError('invalid argument')
  }
}

PseudoMap.prototype.forEach = function (fn: Function,  thisp: any) {
  thisp = thisp || this
  Object.keys(this._data).forEach(function (k: yof) {
    if (k !== 'size')
      fn.call(thisp, this._data[k].value, this._data[k].key)
  }, this)
}

PseudoMap.prototype.has = function (k: ny) {
  return !!find(this._data, k)
}

PseudoMap.prototype.get = function (k: K) {
  var res = find(this._data, k)
  return res && res.value
}

PseudoMap.prototype.set = function (k: any,  v: any) {
  set(this._data, k, v)
}

PseudoMap.prototype.delete = function (k: K) {
  var res = find(this._data, k)
  if (res) {
    delete this._data[res._index]
    this._data.size--
  }
}

PseudoMap.prototype.clear = function () {
  var data = Object.create(null)
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
  set: function (n: number) {},
  enumerable: true,
  configurable: true
})

PseudoMap.prototype.values =
PseudoMap.prototype.keys =
PseudoMap.prototype.entries = function () {
  throw new Error('iterators are not implemented in this version')
}

// Either identical, or both NaN
function same (a: y,  b: any) {
  return a === b || a !== a && b !== b
}

function Entry (k: number,  v: number,  i: number) {
  this.key = k
  this.value = v
  this._index = i
}

function find (data: any,  k: any) {
  for (var i = 0, s = '_' + k, key = s;
       hasOwnProperty.call(data, key);
       key = s + i++) {
    if (same(data[key].key, k))
      return data[key]
  }
}

function set (data: Object,  k: String,  v: Object) {
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