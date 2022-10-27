/* eslint-disable camelcase */

import fs from 'fs';

import path from 'path';
import regenerate from 'regenerate';

const libDir: String = 'lib'

const Space_Separator: Number = regenerate()
    .add(require('unicode-10.0.0/General_Category/Space_Separator/code-points'))
    .remove('\t', '\v', '\f', ' ', '\u00A0', '\uFEFF')

const ID_Start: String = regenerate()
    .add(require('unicode-10.0.0/General_Category/Uppercase_Letter/code-points'))
    .add(require('unicode-10.0.0/General_Category/Lowercase_Letter/code-points'))
    .add(require('unicode-10.0.0/General_Category/Titlecase_Letter/code-points'))
    .add(require('unicode-10.0.0/General_Category/Modifier_Letter/code-points'))
    .add(require('unicode-10.0.0/General_Category/Other_Letter/code-points'))
    .add(require('unicode-10.0.0/General_Category/Letter_Number/code-points'))
    .remove('$', '_')
    .removeRange('A', 'Z')
    .removeRange('a', 'z')

const ID_Continue: String = regenerate()
    .add(ID_Start)
    .add(require('unicode-10.0.0/General_Category/Nonspacing_Mark/code-points'))
    .add(require('unicode-10.0.0/General_Category/Spacing_Mark/code-points'))
    .add(require('unicode-10.0.0/General_Category/Decimal_Number/code-points'))
    .add(require('unicode-10.0.0/General_Category/Connector_Punctuation/code-points'))
    .remove('$', '_')
    .removeRange('0', '9')
    .removeRange('A', 'Z')
    .removeRange('a', 'z')

const outDir: String = libDir
const outPath: String = path.join(outDir, 'unicode.js')

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir)
}

const data: Object = {
    Space_Separator,
    ID_Start,
    ID_Continue,
}

let es6: String = '// This is a generated file. Do not edit.\n'
es6 += Object.keys(data).map((key: String) => `module.exports.${key} = /${data[key]}/\n`).join('')

fs.writeFileSync(outPath, es6)
