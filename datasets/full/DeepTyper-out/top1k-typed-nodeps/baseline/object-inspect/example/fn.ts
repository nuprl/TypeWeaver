'use strict';

var inspect: any = require('../');
var obj: number[] = [1, 2, function f(n: number): string { return n + 5; }, 4];
console.log(inspect(obj));
