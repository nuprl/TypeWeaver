const fs: String = require('fs')
const path: String = require('path')

const JSON5: String = require('../lib')

const pkg: String = require('../package.json')

let pkg5: String = '// This is a generated file. Do not edit.\n'
pkg5 += pkg5 = JSON5.stringify(pkg, null, 2)

fs.writeFileSync(path.resolve(__dirname, '..', 'package.json5'), pkg5)
