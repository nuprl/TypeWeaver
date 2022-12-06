'use strict';

var inspect: Function = require('../');
var obj: any[] = [1, 2, function f(n: number): string { return n + 5; }, 4];
console.log(inspect(obj));
