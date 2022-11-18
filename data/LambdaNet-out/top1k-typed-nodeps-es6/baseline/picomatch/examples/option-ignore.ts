'use strict';

import pm from '..';

const isMatch: object = pm.matcher('*', { ignore: 'f*' });
console.log(isMatch('foo')); //=> false
console.log(isMatch('bar')); //=> true
console.log(isMatch('baz')); //=> true
