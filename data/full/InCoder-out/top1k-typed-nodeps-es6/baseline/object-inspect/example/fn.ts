'use strict';

import inspect from '../';
var obj = [1, 2, function f(n: number) { return n + 5; }, 4];
console.log(inspect(obj));