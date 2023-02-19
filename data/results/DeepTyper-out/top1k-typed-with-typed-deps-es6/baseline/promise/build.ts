'use strict';

import fs from 'fs';
import rimraf from 'rimraf';
import acorn from 'acorn';
import walk from 'acorn/dist/walk';
import crypto from 'crypto';

var shasum: any = crypto.createHash('sha512');
fs.readdirSync(__dirname + '/src').sort().forEach(function (filename: any) {
  shasum.update(fs.readFileSync(__dirname + '/src/' + filename, 'utf8'));
});

const names: {} = {};
const characterSet: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let i: number = characterSet.indexOf(shasum.digest('base64').replace(/[^0-9a-zA-Z]/g, '')[0]);
function getIdFor(name: string): string {
  if (names[name]) return names[name];
  return names[name] = '_' + characterSet[i++ % characterSet.length]
}

function fixup(src: string): any {
  var ast: any = acorn.parse(src);
  src = src.split('');
  walk.simple(ast, {
    MemberExpression: function (node: any) {
      if (node.computed) return;
      if (node.property.type !== 'Identifier') return;
      if (node.property.name[0] !== '_') return;
      replace(node.property, getIdFor(node.property.name));
    }
  });
  function replace(node: any, str: any): any {
    for (var i = node.start; i < node.end; i++) {
      src[i] = '';
    }
    src[node.start] = str;
  }
  return src.join('');
}
rimraf.sync(__dirname + '/lib/');
fs.mkdirSync(__dirname + '/lib/');
fs.readdirSync(__dirname + '/src').forEach(function (filename: string) {
  var src: any = fs.readFileSync(__dirname + '/src/' + filename, 'utf8');
  var out: string = fixup(src);
  fs.writeFileSync(__dirname + '/lib/' + filename, out);
});

rimraf.sync(__dirname + '/domains/');
fs.mkdirSync(__dirname + '/domains/');
fs.readdirSync(__dirname + '/src').forEach(function (filename: string) {
  var src: any = fs.readFileSync(__dirname + '/src/' + filename, 'utf8');
  var out: string = fixup(src);
  out = out.replace(/require\(\'asap\/raw\'\)/g, "require('asap')");
  fs.writeFileSync(__dirname + '/domains/' + filename, out);
});

rimraf.sync(__dirname + '/setimmediate/');
fs.mkdirSync(__dirname + '/setimmediate/');
fs.readdirSync(__dirname + '/src').forEach(function (filename: string) {
  var src: any = fs.readFileSync(__dirname + '/src/' + filename, 'utf8');
  var out: string = fixup(src);
  out = out.replace(/var asap \= require\(\'([a-z\/]+)\'\);/g, '');
  out = out.replace(/asap/g, "setImmediate");
  fs.writeFileSync(__dirname + '/setimmediate/' + filename, out);
});
