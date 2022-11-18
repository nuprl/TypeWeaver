var hasOwnProperty: Function = Object.prototype.hasOwnProperty

export default PseudoMap;

function PseudoMap (set: any[]): Void {
  if (!(this instanceof PseudoMap)) // whyyyyyyy
    throw new TypeError("Constructor PseudoMap requires 'new'")

  this.clear()

  if (set) {
    if ((set instanceof PseudoMap) ||
        (typeof Map === 'function' && set instanceof Map))
      set.forEach(function (value: string, key: string) {
        this.set(key, value)
      }, this)
    else if (Array.isArray(set))
      set.forEach(function (kv: Promise) {
        this.set(kv[0], kv[1])
      }, this)
    else
      throw new TypeError('invalid argument')
  }
}

PseudoMap.prototype.forEach = function (fn: Function, thisp: number) {
  thisp = thisp || this
  Object.keys(this._data).forEach(function (k: number) {
    if (k !== 'size')
      fn.call(thisp, this._data[k].value, this._data[k].key)
  }, this)
}

PseudoMap.prototype.has = function (k: number) {
  return !!find(this._data, k)
}

PseudoMap.prototype.get = function (k: number) {
  var res: object = find(this._data, k)
  return res && res.value
}

PseudoMap.prototype.set = function (k: number, v: any[]) {
  set(this._data, k, v)
}

PseudoMap.prototype.delete = function (k: number) {
  var res: object = find(this._data, k)
  if (res) {
    delete this._data[res._index]
    this._data.size--
  }
}

PseudoMap.prototype.clear = function () {
  var data: any[] = Object.create(null)
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
function same (a: string, b: number): boolean {
  return a === b || a !== a && b !== b
}

function Entry (k: string, v: string, i: string): Void {
  this.key = k
  this.value = v
  this._index = i
}

function find (data: object, k: string): string {
  for (var i = 0, s = '_' + k, key = s;
       hasOwnProperty.call(data, key);
       key = s + i++) {
    if (same(data[key].key, k))
      return data[key]
  }
}

function set (data: object, k: number, v: string): Void {
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
