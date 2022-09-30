'use strict'

import fs from 'fs'
const statusCodes: any = require('./')

const code: string = 'module.exports = ' + JSON.stringify(statusCodes, null, 2) + '\n'

fs.writeFileSync('browser.js', code)
