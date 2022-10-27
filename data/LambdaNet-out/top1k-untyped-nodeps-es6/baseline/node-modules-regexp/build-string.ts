'use strict';
import path from 'path';
import fs from 'fs';
import nm from './';

var nms: String = nm.toString();
nms = nms.substring(1, nms.length - 1);

var code: String = '\'use strict\';\nmodule.exports = \'' + nms.replace(/([\\])/g, '\\$1') + '\';\n';

var output: String = path.join(__dirname, 'string.js');

fs.writeFileSync(output, code);
