'use strict';

import micromatch from '..';

const onResult = ({ glob, regex, input, output }) => {
  console.log({ input, output });
};

const isMatch = micromatch.matcher('*', { onResult, ignore: 'f*' });
isMatch('foo');
isMatch('bar');
isMatch('baz');
