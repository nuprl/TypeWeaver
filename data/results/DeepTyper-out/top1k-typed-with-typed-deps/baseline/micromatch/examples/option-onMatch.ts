'use strict';

const micromatch: any = require('..');

const onMatch: any = ({ glob, regex, input, output }) => {
  console.log({ input, output });
  // { input: 'some\\path', output: 'some/path' }
  // { input: 'some\\path', output: 'some/path' }
  // { input: 'some\\path', output: 'some/path' }
};

const isMatch: any = micromatch.matcher('**', { onMatch, posixSlashes: true });
isMatch('some\\path');
isMatch('some\\path');
isMatch('some\\path');
