'use strict'

const { stringify } = require('jsonfile/utils')
const { outputFileSync } = require('../output-file')

function outputJsonSync (file: string, data: any, options: any): void {
  const str: string = stringify(data, options)

  outputFileSync(file, str, options)
}

module.exports = outputJsonSync
