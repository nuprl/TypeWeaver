import fs from 'fs';
import JSON5 from './';

// eslint-disable-next-line node/no-deprecated-api
require.extensions['.json5'] = function (module: Module, filename: string) {
    const content = fs.readFileSync(filename, 'utf8')
    try {
        export default JSON5.parse(content);
    } catch (err) {
        err.message = filename + ': ' + err.message
        throw err
    }
}