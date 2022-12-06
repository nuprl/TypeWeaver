/* eslint-disable camelcase */

const fs: string = require('fs')
const path: string = require('path')
const regenerate: Function = require('regenerate')

const libDir: string = 'lib'

const Space_Separator: number = regenerate()
    .add(require('unicode-10.0.0/General_Category/Space_Separator/code-points'))
    .remove('\t', '\v', '\f', ' ', '\u00A0', '\uFEFF')

const ID_Start: string = regenerate()
    .add(require('unicode-10.0.0/General_Category/Uppercase_Letter/code-points'))
    .add(require('unicode-10.0.0/General_Category/Lowercase_Letter/code-points'))
    .add(require('unicode-10.0.0/General_Category/Titlecase_Letter/code-points'))
    .add(require('unicode-10.0.0/General_Category/Modifier_Letter/code-points'))
    .add(require('unicode-10.0.0/General_Category/Other_Letter/code-points'))
    .add(require('unicode-10.0.0/General_Category/Letter_Number/code-points'))
    .remove('$', '_')
    .removeRange('A', 'Z')
    .removeRange('a', 'z')

const ID_Continue: string = regenerate()
    .add(ID_Start)
    .add(require('unicode-10.0.0/General_Category/Nonspacing_Mark/code-points'))
    .add(require('unicode-10.0.0/General_Category/Spacing_Mark/code-points'))
    .add(require('unicode-10.0.0/General_Category/Decimal_Number/code-points'))
    .add(require('unicode-10.0.0/General_Category/Connector_Punctuation/code-points'))
    .remove('$', '_')
    .removeRange('0', '9')
    .removeRange('A', 'Z')
    .removeRange('a', 'z')

const outDir: string = libDir
const outPath: string = path.join(outDir, 'unicode.js')

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir)
}

const data: object = {
    Space_Separator,
    ID_Start,
    ID_Continue,
}

let es6: string = '// This is a generated file. Do not edit.\n'
es6 += Object.keys(data).map((key: string) => `module.exports.${key} = /${data[key]}/\n`).join('')

fs.writeFileSync(outPath, es6)
