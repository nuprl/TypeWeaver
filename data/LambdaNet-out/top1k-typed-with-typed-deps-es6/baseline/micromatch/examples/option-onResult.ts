'use strict';

import micromatch from '..';

const onResult: Function = ({ glob, regex, input, output }) => {
  console.log({ input, output });
};

const isMatch: Object = micromatch.matcher('*', { onResult, ignore: 'f*' });
isMatch('foo');
isMatch('bar');
isMatch('baz');
