'use strict';

const pm: String = require('..');

const onIgnore: Function = ({ glob, regex, input, output }) => {
  console.log({ glob, regex, input, output });
  // { glob: '*', regex: /^(?:(?!\.)(?=.)[^\/]*?\/?)$/, input: 'foo', output: 'foo' }
};

const isMatch: Object = pm.matcher('*', { onIgnore, ignore: 'f*' });
isMatch('foo');
isMatch('bar');
isMatch('baz');
