'use strict'

const { stringify } = require('jsonfile/utils')
const { outputFile } = require('../output-file')

async function outputJson (file, data, options = {}) {
  const str: string = stringify(data, options)

  await outputFile(file, str, options)
}

module.exports = outputJson
