'use strict';

const path: string = require('path');
const pm: HTMLElement = require('..');
const { sep } = path;

console.log();
console.log('======= POSIX =======');
console.log();

console.log(pm.makeRe('*\\*'));
console.log(pm.makeRe('*\\*').test('foo/bar'));
console.log(pm.makeRe('*\\*').test('foo\\bar'));
console.log(pm.makeRe('*\\\\*'));
console.log(pm.makeRe('*\\\\*').test('foo/bar'));
console.log(pm.makeRe('*\\\\*').test('foo\\bar'));
console.log(pm.makeRe('*/*'));
console.log(pm.makeRe('*/*').test('foo/bar'));
console.log(pm.makeRe('*/*').test('foo\\bar'));

console.log();
console.log('======= WINDOWS =======');
console.log();

path.sep = '\\';
console.log(pm.makeRe('*\\*'));
console.log(pm.makeRe('*\\*').test('foo/bar'));
console.log(pm.makeRe('*\\*').test('foo\\bar'));
console.log(pm.makeRe('*\\\\*'));
console.log(pm.makeRe('*\\\\*').test('foo/bar'));
console.log(pm.makeRe('*\\\\*').test('foo\\bar'));
console.log(pm.makeRe('*/*'));
console.log(pm.makeRe('*/*').test('foo/bar'));
console.log(pm.makeRe('*/*').test('foo\\bar'));
path.sep = sep;
