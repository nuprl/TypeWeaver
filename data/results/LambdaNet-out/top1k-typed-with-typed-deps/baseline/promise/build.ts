'use strict';

var fs: string = require('fs');
var rimraf: any[] = require('rimraf');
var acorn: string = require('acorn');
var walk: string = require('acorn/dist/walk');
var crypto: string = require('crypto');

var shasum: any[] = crypto.createHash('sha512');
fs.readdirSync(__dirname + '/src').sort().forEach(function (filename: string) {
  shasum.update(fs.readFileSync(__dirname + '/src/' + filename, 'utf8'));
});

const names: object = {};
const characterSet: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let i: number = characterSet.indexOf(shasum.digest('base64').replace(/[^0-9a-zA-Z]/g, '')[0]);
function getIdFor(name: string): any[] {
  if (names[name]) return names[name];
  return names[name] = '_' + characterSet[i++ % characterSet.length]
}

function fixup(src: any[]): string {
  var ast: string = acorn.parse(src);
  src = src.split('');
  walk.simple(ast, {
    MemberExpression: function (node: object) {
      if (node.computed) return;
      if (node.property.type !== 'Identifier') return;
      if (node.property.name[0] !== '_') return;
      replace(node.property, getIdFor(node.property.name));
    }
  });
  function replace(node: Node, str: string): void {
    for (var i = node.start; i < node.end; i++) {
      src[i] = '';
    }
    src[node.start] = str;
  }
  return src.join('');
}
rimraf.sync(__dirname + '/lib/');
fs.mkdirSync(__dirname + '/lib/');
fs.readdirSync(__dirname + '/src').forEach(function (filename: number) {
  var src: string = fs.readFileSync(__dirname + '/src/' + filename, 'utf8');
  var out: string = fixup(src);
  fs.writeFileSync(__dirname + '/lib/' + filename, out);
});

rimraf.sync(__dirname + '/domains/');
fs.mkdirSync(__dirname + '/domains/');
fs.readdirSync(__dirname + '/src').forEach(function (filename: number) {
  var src: string = fs.readFileSync(__dirname + '/src/' + filename, 'utf8');
  var out: string = fixup(src);
  out = out.replace(/require\(\'asap\/raw\'\)/g, "require('asap')");
  fs.writeFileSync(__dirname + '/domains/' + filename, out);
});

rimraf.sync(__dirname + '/setimmediate/');
fs.mkdirSync(__dirname + '/setimmediate/');
fs.readdirSync(__dirname + '/src').forEach(function (filename: number) {
  var src: string = fs.readFileSync(__dirname + '/src/' + filename, 'utf8');
  var out: string = fixup(src);
  out = out.replace(/var asap \= require\(\'([a-z\/]+)\'\);/g, '');
  out = out.replace(/asap/g, "setImmediate");
  fs.writeFileSync(__dirname + '/setimmediate/' + filename, out);
});
