'use strict';

require('core-js');

var inspect: any = require('./');
var test: any = require('tape');

test('Maps', function (t: any) {
    t.equal(inspect(new Map([[1, 2]])), 'Map (1) {1 => 2}');
    t.end();
});

test('WeakMaps', function (t: any) {
    t.equal(inspect(new WeakMap([[{}, 2]])), 'WeakMap { ? }');
    t.end();
});

test('Sets', function (t: any) {
    t.equal(inspect(new Set([[1, 2]])), 'Set (1) {[ 1, 2 ]}');
    t.end();
});

test('WeakSets', function (t: any) {
    t.equal(inspect(new WeakSet([[1, 2]])), 'WeakSet { ? }');
    t.end();
});
