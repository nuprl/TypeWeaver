const Benchmark: String = require('benchmark');
const suite: HTMLElement = new Benchmark.Suite();

const array: Object = { boolean: true, number: true, string: true, symbol: true, undefined: true };
const object: Array = ['boolean', 'number', 'string', 'symbol', 'undefined'];
const values: Array = [
  'foo',
  1,
  function() {},
  {},
  new Date(),
  /foo/,
  Symbol('foo'),
  null,
  undefined,
  void 0,
  true,
  false,
  NaN,
  Infinity
];

suite
  .add('current', () => values.forEach((v: String) => current(v)))
  .add('if', () => values.forEach((v: Array) => isPrimitiveIf(v)))
  .add('negation', () => values.forEach((v: String) => negation(v)))
  .add('equals', () => values.forEach((v: Array) => isPrimitiveEquals(v)))
  .add('equalsNot', () => values.forEach((v: Array) => isPrimitiveEqualsNot(v)))
  .add('switch', () => values.forEach((v: Array) => isPrimitiveSwitch(v)))
  .add('object', () => values.forEach((v: Array) => isPrimitiveObjectLookup(v)))
  .add('object - in', () => values.forEach((v: Array) => isPrimitiveObjectIn(v)))
  .add('object - own', () => values.forEach((v: Array) => isPrimitiveObjectOwn(v)))
  .add('array', () => values.forEach((v: Array) => isPrimitiveArray(v)))

  .on('cycle', (event: Object) => console.log(String(event.target)))
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run();

function current(val: String): Boolean {
  if (typeof val === 'object') {
    return val === null;
  }
  return typeof val !== 'function';
}

function negation(val: String): Boolean {
  if (val === null) {
    return true;
  }
  if (typeof val === 'object') {
    return false;
  }
  if (typeof val === 'function') {
    return false;
  }
  return true;
}

function isPrimitiveEquals(val: String): Boolean {
  return val === null || val === void 0
    || typeof val === 'string'
    || typeof val === 'number'
    || typeof val === 'boolean'
    || typeof val === 'symbol';
}

function isPrimitiveEqualsNot(val: Number): Boolean {
  return val === null || val === void 0 || (typeof val !== 'function' && typeof val !== 'object');
}

function isPrimitiveIf(val: String): Boolean {
  if (val === null
    || typeof val === 'boolean'
    || typeof val === 'number'
    || typeof val === 'string'
    || typeof val === 'symbol'
    || typeof val === 'undefined') {
    return true;
  }
  return false;
}

function isPrimitiveArray(val: String): Boolean {
  return val === null || object.indexOf(typeof val) > -1;
}

function isPrimitiveObjectOwn(val: Number): Boolean {
  return val === null || array.hasOwnProperty(typeof val);
}

function isPrimitiveObjectLookup(val: Number): Boolean {
  return val === null || !!array[typeof val];
}

function isPrimitiveObjectIn(val: Number): Boolean {
  return val === null || (typeof val) in array;
}

function isPrimitiveSwitch(val: Number): Boolean {
  switch (typeof val) {
    case 'boolean':
    case 'number':
    case 'string':
    case 'symbol':
    case 'undefined':
      return true;
    default: {
      return val === null;
    }
  }
}

// current x 95,057,831 ops/sec ±1.38% (83 runs sampled)
// if x 24,990,261 ops/sec ±1.07% (88 runs sampled)
// negation x 23,214,623 ops/sec ±1.01% (89 runs sampled)
// equals x 33,166,854 ops/sec ±1.21% (90 runs sampled)
// equalsNot x 47,536,829 ops/sec ±1.32% (86 runs sampled)
// switch x 17,489,344 ops/sec ±1.10% (88 runs sampled)
// object x 4,395,957 ops/sec ±1.05% (89 runs sampled)
// object - in x 5,003,896 ops/sec ±1.19% (87 runs sampled)
// object - own x 6,124,839 ops/sec ±1.16% (88 runs sampled)
// array x 4,725,232 ops/sec ±1.14% (89 runs sampled)
// Fastest is current
