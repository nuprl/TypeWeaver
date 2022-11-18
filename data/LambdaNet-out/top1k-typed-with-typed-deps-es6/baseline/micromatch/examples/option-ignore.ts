'use strict';

import micromatch from '..';

const isMatch: object = micromatch.matcher('*', { ignore: 'f*' });
console.log(isMatch('foo')); //=> false
console.log(isMatch('bar')); //=> true
console.log(isMatch('baz')); //=> true
