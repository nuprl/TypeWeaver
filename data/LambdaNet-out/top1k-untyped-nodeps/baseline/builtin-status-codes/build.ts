'use strict'

const fs: String = require('fs')
const statusCodes: String = require('./')

const code: String = 'module.exports = ' + JSON.stringify(statusCodes, null, 2) + '\n'

fs.writeFileSync('browser.js', code)
