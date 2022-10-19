'use strict';

const { parserPlugins } = require('@istanbuljs/schema').defaults.nyc;

export default {
    cache: false,
    parserPlugins: parserPlugins.concat('typescript')
};
