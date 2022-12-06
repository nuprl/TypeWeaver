'use strict'

export default function whichModule (exported: string): object {
  for (var i = 0, files = Object.keys(require.cache), mod; i < files.length; i++) {
    mod = require.cache[files[i]]
    if (mod.exports === exported) return mod
  }
  return null
};
