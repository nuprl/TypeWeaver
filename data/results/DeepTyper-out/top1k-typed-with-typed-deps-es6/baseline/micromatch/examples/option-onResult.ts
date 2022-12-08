'use strict';

import micromatch from '..';

const onResult: void = ({ glob, regex, input, output }) => {
  console.log({ input, output });
};

const isMatch: any = micromatch.matcher('*', { onResult, ignore: 'f*' });
isMatch('foo');
isMatch('bar');
isMatch('baz');
