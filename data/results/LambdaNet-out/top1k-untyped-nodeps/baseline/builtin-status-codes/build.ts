'use strict'

const fs: string = require('fs')
const statusCodes: string = require('./')

const code: string = 'module.exports = ' + JSON.stringify(statusCodes, null, 2) + '\n'

fs.writeFileSync('browser.js', code)
