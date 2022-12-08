// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.

import errors from './errors';

import types from './types';
import Reader from './reader';
import Writer from './writer';


// --- Exports

export default {

  Reader: Reader,

  Writer: Writer

};

for (var t in types) {
  if (types.hasOwnProperty(t))
    module.exports[t] = types[t];
}
for (var e in errors) {
  if (errors.hasOwnProperty(e))
    module.exports[e] = errors[e];
}
