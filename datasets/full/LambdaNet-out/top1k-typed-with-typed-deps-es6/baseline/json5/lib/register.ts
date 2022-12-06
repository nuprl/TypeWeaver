import fs from 'fs';
import JSON5 from './';

// eslint-disable-next-line node/no-deprecated-api
require.extensions['.json5'] = function (module: string, filename: string) {
    const content: string = fs.readFileSync(filename, 'utf8')
    try {
        export default JSON5.parse(content);
    } catch (err) {
        err.message = filename + ': ' + err.message
        throw err
    }
}
