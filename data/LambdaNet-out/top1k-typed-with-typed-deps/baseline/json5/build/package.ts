const fs: string = require('fs')
const path: string = require('path')

const JSON5: string = require('../lib')

const pkg: string = require('../package.json')

let pkg5: string = '// This is a generated file. Do not edit.\n'
pkg5 += pkg5 = JSON5.stringify(pkg, null, 2)

fs.writeFileSync(path.resolve(__dirname, '..', 'package.json5'), pkg5)
