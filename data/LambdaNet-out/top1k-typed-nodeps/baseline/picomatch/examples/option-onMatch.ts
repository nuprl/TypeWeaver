'use strict';

const pm: string = require('..');

const onMatch: Function = ({ glob, regex, input, output }) => {
  console.log({ input, output });
  // { input: 'some\\path', output: 'some/path' }
  // { input: 'some\\path', output: 'some/path' }
  // { input: 'some\\path', output: 'some/path' }
};

const isMatch: object = pm.matcher('**', { onMatch, posixSlashes: true });
isMatch('some\\path');
isMatch('some\\path');
isMatch('some\\path');
