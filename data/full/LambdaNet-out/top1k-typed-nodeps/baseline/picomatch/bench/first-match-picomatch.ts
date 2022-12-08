'use strict';

const pm: string = require('..');

console.time('picomatch');
console.log(pm.makeRe('**/*').test('foo/bar/baz/qux.js'));
console.timeEnd('picomatch');
