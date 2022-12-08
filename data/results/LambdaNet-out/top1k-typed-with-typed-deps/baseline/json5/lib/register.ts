const fs: string = require('fs')
const JSON5: any[] = require('./')

// eslint-disable-next-line node/no-deprecated-api
require.extensions['.json5'] = function (module: string, filename: string) {
    const content: string = fs.readFileSync(filename, 'utf8')
    try {
        module.exports = JSON5.parse(content)
    } catch (err) {
        err.message = filename + ': ' + err.message
        throw err
    }
}
