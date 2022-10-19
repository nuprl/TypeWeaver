import { createHash } from 'crypto';
import { name } from '../package.json';
// TODO: increment this version if there are schema changes
// that are not backwards compatible:
const VERSION = '4';

const SHA = 'sha1';

export default {
    SHA,
    MAGIC_KEY: '_coverageSchema',
    MAGIC_VALUE: createHash(SHA)
        .update(name + '@' + VERSION)
        .digest('hex')
};
