'use strict';

const micromatch: String = require('..');

const onIgnore: Function = ({ glob, regex, input, output }) => {
  console.log({ glob, regex, input, output });
  // { glob: '*', regex: /^(?:(?!\.)(?=.)[^\/]*?\/?)$/, input: 'foo', output: 'foo' }
};

const isMatch: Object = micromatch.matcher('*', { onIgnore, ignore: 'f*' });
isMatch('foo');
isMatch('bar');
isMatch('baz');
