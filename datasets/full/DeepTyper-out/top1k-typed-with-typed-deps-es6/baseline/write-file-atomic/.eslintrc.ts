/* This file is automatically added by @npmcli/template-oss. Do not edit. */

'use strict'

const { readdirSync: readdir } = require('fs')

const localConfigs: any = readdir(__dirname)
  .filter((file: string) => file.startsWith('.eslintrc.local.'))
  .map((file: string) => `./${file}`)

module.exports = {
  root: true,
  extends: [
    '@npmcli',
    ...localConfigs,
  ],
}
