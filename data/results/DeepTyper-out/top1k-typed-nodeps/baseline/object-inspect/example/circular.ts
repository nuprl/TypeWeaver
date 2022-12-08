'use strict';

var inspect: any = require('../');
var obj: any = { a: 1, b: [3, 4] };
obj.c = obj;
console.log(inspect(obj));
