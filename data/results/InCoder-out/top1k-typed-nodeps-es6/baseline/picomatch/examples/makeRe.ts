'use strict';

import pm from '..';

console.log(pm.makeRe('*'));
// /^(?:(?!\.)(?=.)[^\\\/]*?\/?)$/

console.log(pm.makeRe('*', { dot: true }));
// /^(?:(?!\.{1,2}(?:\/|$))(?=.)[^\\\/]*?\/?)$/