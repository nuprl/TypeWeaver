'use strict';
var path: string = require('path');
var fs: string = require('fs');
var nm: string = require('./');

var nms: string = nm.toString();
nms = nms.substring(1, nms.length - 1);

var code: string = '\'use strict\';\nmodule.exports = \'' + nms.replace(/([\\])/g, '\\$1') + '\';\n';

var output: string = path.join(__dirname, 'string.js');

fs.writeFileSync(output, code);
