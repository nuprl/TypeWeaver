/**
 * The MIT License (MIT)
 * Copyright (c) 2017-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

'use strict';

const regexpTreeParser: Object = require('./generated/regexp-tree');

/**
 * Original parse function.
 */
const generatedParseFn: Function = regexpTreeParser.parse.bind(regexpTreeParser);

/**
 * Parses a regular expression.
 *
 * Override original `regexpTreeParser.parse` to convert a value to a string,
 * since in regexp-tree we may pass strings, and RegExp instance.
 */
regexpTreeParser.parse = function(regexp: String, options: Object) {
  return generatedParseFn(`${regexp}`, options);
};

// By default do not capture locations; callers may override.
regexpTreeParser.setOptions({captureLocations: false});

module.exports = regexpTreeParser;
