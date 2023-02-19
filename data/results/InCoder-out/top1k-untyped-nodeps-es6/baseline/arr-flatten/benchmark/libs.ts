'use strict';

import fs from 'fs';
import path from 'path';
import write from 'write';
var cwd = path.join.bind(path, __dirname, 'code');

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
].forEach(function(name: String) {
  var fp = cwd(name + '.js');
  if (!fs.existsSync(fp)) {
    write.sync(fp, `module.exports = require('${name}');\n`);
  }
});