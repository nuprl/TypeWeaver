'use strict'

const { stringify } = require('jsonfile/utils')
const { outputFile } = require('../output-file')

async function outputJson (file: File,  data: any,  options = {}: JsonOutputOptions) {
  const str = stringify(data, options)

  await outputFile(file, str, options)
}

module.exports = outputJson