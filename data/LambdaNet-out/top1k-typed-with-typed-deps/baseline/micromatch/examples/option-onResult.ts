'use strict';

const micromatch: string = require('..');

const onResult: Function = ({ glob, regex, input, output }) => {
  console.log({ input, output });
};

const isMatch: object = micromatch.matcher('*', { onResult, ignore: 'f*' });
isMatch('foo');
isMatch('bar');
isMatch('baz');
