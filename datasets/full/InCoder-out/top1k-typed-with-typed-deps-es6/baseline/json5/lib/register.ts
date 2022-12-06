import fs from 'fs';
import JSON5 from './';

// eslint-disable-next-line node/no-deprecated-api
require.extensions['.json5'] = function (module: any,  filename: any) {
    const content = fs.readFileSync(filename, 'utf8')
    try {
        export default JSON5.parse(content);
    } catch (err) {
        err.message = filename + ': ' + err.message
        throw err
    }
}