'use strict';

import semver from 'semver';

export default {
    'hook-require': !semver.lt(process.version, '11.11.0'),
    'hook-run-in-this-context': true
};
