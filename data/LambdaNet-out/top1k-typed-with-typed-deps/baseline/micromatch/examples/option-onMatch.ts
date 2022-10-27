'use strict';

const micromatch: String = require('..');

const onMatch: Function = ({ glob, regex, input, output }) => {
  console.log({ input, output });
  // { input: 'some\\path', output: 'some/path' }
  // { input: 'some\\path', output: 'some/path' }
  // { input: 'some\\path', output: 'some/path' }
};

const isMatch: Object = micromatch.matcher('**', { onMatch, posixSlashes: true });
isMatch('some\\path');
isMatch('some\\path');
isMatch('some\\path');
