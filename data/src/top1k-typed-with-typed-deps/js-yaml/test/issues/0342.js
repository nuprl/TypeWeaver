'use strict';


var assert = require('assert');
var yaml = require('../../');
var simpleArray = [ 'a', 'b' ];
var arrayOfSimpleObj = [ { a: 1 }, { b: 2 } ];
var arrayOfObj = [ { a: 1, b: 'abc' }, { c: 'def', d: 2 } ];


it('space should be added for array, regardless of indent', function () {
  assert.deepStrictEqual(
    yaml.dump(simpleArray, { indent: 1 }),
    '- a\n- b\n'
  );
  assert.deepStrictEqual(
    yaml.dump(simpleArray, { indent: 2 }),
    '- a\n- b\n'
  );
  assert.deepStrictEqual(
    yaml.dump(simpleArray, { indent: 3 }),
    '- a\n- b\n'
  );
  assert.deepStrictEqual(
    yaml.dump(simpleArray, { indent: 4 }),
    '- a\n- b\n'
  );
});

it('array of objects should not wrap at indentation of 2', function () {
  assert.deepStrictEqual(
    yaml.dump(arrayOfSimpleObj, { indent: 2 }),
    '- a: 1\n- b: 2\n'
  );
  assert.deepStrictEqual(
    yaml.dump(arrayOfObj, { indent: 2 }),
    '- a: 1\n  b: abc\n- c: def\n  d: 2\n'
  );
});

it('EOL space should not be added on array of objects at indentation of 3', function () {
  assert.deepStrictEqual(
    yaml.dump(arrayOfSimpleObj, { indent: 3 }),
    '-\n   a: 1\n-\n   b: 2\n'
  );
  assert.deepStrictEqual(
    yaml.dump(arrayOfObj, { indent: 3 }),
    '-\n   a: 1\n   b: abc\n-\n   c: def\n   d: 2\n'
  );
});

it('EOL space should not be added on array of objects at indentation of 4', function () {
  assert.deepStrictEqual(
    yaml.dump(arrayOfSimpleObj, { indent: 4 }),
    '-\n    a: 1\n-\n    b: 2\n'
  );
  assert.deepStrictEqual(
    yaml.dump(arrayOfObj, { indent: 4 }),
    '-\n    a: 1\n    b: abc\n-\n    c: def\n    d: 2\n'
  );
});
