'use strict';

const pm: String = require('..');

const onResult: Function = ({ glob, regex, input, output }) => {
  console.log({ input, output });
};

const isMatch: Object = pm.matcher('*', { onResult, ignore: 'f*' });
isMatch('foo');
isMatch('bar');
isMatch('baz');
