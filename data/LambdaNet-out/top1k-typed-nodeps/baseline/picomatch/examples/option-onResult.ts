'use strict';

const pm: string = require('..');

const onResult: Function = ({ glob, regex, input, output }) => {
  console.log({ input, output });
};

const isMatch: object = pm.matcher('*', { onResult, ignore: 'f*' });
isMatch('foo');
isMatch('bar');
isMatch('baz');
