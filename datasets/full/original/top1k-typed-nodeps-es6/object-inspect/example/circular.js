'use strict';

import inspect from '../';
var obj = { a: 1, b: [3, 4] };
obj.c = obj;
console.log(inspect(obj));
