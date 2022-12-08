'use strict';

import compile from '../lib/compile';
import parse from '../lib/parse';
console.log(compile(parse('{a,b,c}')));
console.log(compile(parse('{01..09}')));
