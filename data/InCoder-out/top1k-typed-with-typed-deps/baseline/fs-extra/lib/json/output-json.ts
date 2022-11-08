'use strict'

const { stringify } = require('jsonfile/utils')
const { outputFile } = require('../output-file')

async function outputJson (file: string | Buffer,  data: any,  options = {}: OutputJsonOptions) {
  const str = stringify(data, options)

  await outputFile(file, str, options)
}

module.exports = outputJson