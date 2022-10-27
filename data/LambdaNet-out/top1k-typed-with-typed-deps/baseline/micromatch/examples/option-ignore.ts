'use strict';

const micromatch: String = require('..');

const isMatch: Object = micromatch.matcher('*', { ignore: 'f*' });
console.log(isMatch('foo')); //=> false
console.log(isMatch('bar')); //=> true
console.log(isMatch('baz')); //=> true
