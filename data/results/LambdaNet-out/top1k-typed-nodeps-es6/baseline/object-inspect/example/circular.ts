'use strict';

import inspect from '../';
var obj: object = { a: 1, b: [3, 4] };
obj.c = obj;
console.log(inspect(obj));
