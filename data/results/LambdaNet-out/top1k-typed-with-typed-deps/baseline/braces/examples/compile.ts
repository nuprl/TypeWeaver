'use strict';

const compile: Function = require('../lib/compile');
const parse: Function = require('../lib/parse');
console.log(compile(parse('{a,b,c}')));
console.log(compile(parse('{01..09}')));
