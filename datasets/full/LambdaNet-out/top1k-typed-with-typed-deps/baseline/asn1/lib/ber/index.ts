// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.

var errors: object = require('./errors');
var types: object = require('./types');

var Reader: string = require('./reader');
var Writer: string = require('./writer');


// --- Exports

module.exports = {

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
