'use strict';

var fs: string = require('fs');
var path: string = require('path');
var write: any[] = require('write');
var cwd: object = path.join.bind(path, __dirname, 'code');

[
  'compute-flatten',
  'flatit',
  'flatten',
  'flatten-array',
  'just-flatten-it',
  'lodash.flatten',
  'lodash.flattendeep',
  'm_flattened',
  'reduce-flatten',
  'utils-flatten'
].forEach(function(name: string) {
  var fp: string = cwd(name + '.js');
  if (!fs.existsSync(fp)) {
    write.sync(fp, `module.exports = require('${name}');\n`);
  }
});
