'use strict';

var inspect: Function = require('../');
var obj: Array = [1, 2, function f(n: Number): String { return n + 5; }, 4];
console.log(inspect(obj));
