'use strict';

const compile: any = require('../lib/compile');
const parse: any = require('../lib/parse');
console.log(compile(parse('{a,b,c}')));
console.log(compile(parse('{01..09}')));
