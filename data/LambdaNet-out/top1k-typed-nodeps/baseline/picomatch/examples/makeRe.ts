'use strict';

const pm: String = require('..');

console.log(pm.makeRe('*'));
// /^(?:(?!\.)(?=.)[^\\\/]*?\/?)$/

console.log(pm.makeRe('*', { dot: true }));
// /^(?:(?!\.{1,2}(?:\/|$))(?=.)[^\\\/]*?\/?)$/
