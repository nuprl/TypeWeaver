'use strict';

require('core-js');

var inspect: Function = require('./');
var test: Object = require('tape');

test('Maps', function (t: Object) {
    t.equal(inspect(new Map([[1, 2]])), 'Map (1) {1 => 2}');
    t.end();
});

test('WeakMaps', function (t: Object) {
    t.equal(inspect(new WeakMap([[{}, 2]])), 'WeakMap { ? }');
    t.end();
});

test('Sets', function (t: Object) {
    t.equal(inspect(new Set([[1, 2]])), 'Set (1) {[ 1, 2 ]}');
    t.end();
});

test('WeakSets', function (t: Object) {
    t.equal(inspect(new WeakSet([[1, 2]])), 'WeakSet { ? }');
    t.end();
});
