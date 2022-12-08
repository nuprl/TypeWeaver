'use strict';

import inspect from '../';
import { Buffer } from 'safer-buffer';

var holes: any[] = ['a', 'b'];
holes[4] = 'e';
holes[6] = 'g';

var obj: object = {
    a: 1,
    b: [3, 4, undefined, null],
    c: undefined,
    d: null,
    e: {
        regex: /^x/i,
        buf: Buffer.from('abc'),
        holes: holes
    },
    now: new Date()
};
obj.self = obj;
console.log(inspect(obj));
