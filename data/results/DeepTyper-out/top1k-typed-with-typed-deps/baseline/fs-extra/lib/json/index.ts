'use strict'

const u: any = require('universalify').fromPromise
const jsonFile: any = require('./jsonfile')

jsonFile.outputJson = u(require('./output-json'))
jsonFile.outputJsonSync = require('./output-json-sync')
// aliases
jsonFile.outputJSON = jsonFile.outputJson
jsonFile.outputJSONSync = jsonFile.outputJsonSync
jsonFile.writeJSON = jsonFile.writeJson
jsonFile.writeJSONSync = jsonFile.writeJsonSync
jsonFile.readJSON = jsonFile.readJson
jsonFile.readJSONSync = jsonFile.readJsonSync

module.exports = jsonFile
