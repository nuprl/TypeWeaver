'use strict'

import fs from 'fs';
import statusCodes from './';

const code = 'module.exports = ' + JSON.stringify(statusCodes, null, 2) + '\n'

fs.writeFileSync('browser.js', code)
