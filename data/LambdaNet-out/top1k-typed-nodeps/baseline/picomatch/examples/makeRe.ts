'use strict';

const pm: string = require('..');

console.log(pm.makeRe('*'));
// /^(?:(?!\.)(?=.)[^\\\/]*?\/?)$/

console.log(pm.makeRe('*', { dot: true }));
// /^(?:(?!\.{1,2}(?:\/|$))(?=.)[^\\\/]*?\/?)$/
