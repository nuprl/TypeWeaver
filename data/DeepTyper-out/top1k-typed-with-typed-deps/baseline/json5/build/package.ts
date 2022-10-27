const fs: any = require('fs')
const path: any = require('path')

const JSON5: any = require('../lib')

const pkg: any = require('../package.json')

let pkg5: string = '// This is a generated file. Do not edit.\n'
pkg5 += pkg5 = JSON5.stringify(pkg, null, 2)

fs.writeFileSync(path.resolve(__dirname, '..', 'package.json5'), pkg5)
