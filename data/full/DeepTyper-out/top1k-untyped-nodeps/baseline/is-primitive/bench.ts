const Benchmark: any = require('benchmark');
const suite: any = new Benchmark.Suite();

const array: any = { boolean: true, number: true, string: true, symbol: true, undefined: true };
const object: string[] = ['boolean', 'number', 'string', 'symbol', 'undefined'];
const values: string[] = [
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
  .add('current', () => values.forEach((v: any) => current(v)))
  .add('if', () => values.forEach((v: any) => isPrimitiveIf(v)))
  .add('negation', () => values.forEach((v: any) => negation(v)))
  .add('equals', () => values.forEach((v: any) => isPrimitiveEquals(v)))
  .add('equalsNot', () => values.forEach((v: any) => isPrimitiveEqualsNot(v)))
  .add('switch', () => values.forEach((v: any) => isPrimitiveSwitch(v)))
  .add('object', () => values.forEach((v: any) => isPrimitiveObjectLookup(v)))
  .add('object - in', () => values.forEach((v: any) => isPrimitiveObjectIn(v)))
  .add('object - own', () => values.forEach((v: any) => isPrimitiveObjectOwn(v)))
  .add('array', () => values.forEach((v: any) => isPrimitiveArray(v)))

  .on('cycle', (event: any) => console.log(String(event.target)))
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run();

function current(val: any): boolean {
  if (typeof val === 'object') {
    return val === null;
  }
  return typeof val !== 'function';
}

function negation(val: any): boolean {
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

function isPrimitiveEquals(val: any): boolean {
  return val === null || val === void 0
    || typeof val === 'string'
    || typeof val === 'number'
    || typeof val === 'boolean'
    || typeof val === 'symbol';
}

function isPrimitiveEqualsNot(val: any): boolean {
  return val === null || val === void 0 || (typeof val !== 'function' && typeof val !== 'object');
}

function isPrimitiveIf(val: any): boolean {
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

function isPrimitiveArray(val: any): boolean {
  return val === null || object.indexOf(typeof val) > -1;
}

function isPrimitiveObjectOwn(val: any): boolean {
  return val === null || array.hasOwnProperty(typeof val);
}

function isPrimitiveObjectLookup(val: any): boolean {
  return val === null || !!array[typeof val];
}

function isPrimitiveObjectIn(val: any): boolean {
  return val === null || (typeof val) in array;
}

function isPrimitiveSwitch(val: any): boolean {
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
