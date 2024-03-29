#!/usr/bin/env node
var nopt = require('../lib/nopt')
var path = require('path')
var types = { num: Number,
  bool: Boolean,
  help: Boolean,
  list: Array,
  'num-list': [Number, Array],
  'str-list': [String, Array],
  'bool-list': [Boolean, Array],
  str: String,
  clear: Boolean,
  config: Boolean,
  length: Number,
  file: path,
}
var shorthands = { s: ['--str', 'astring'],
  b: ['--bool'],
  nb: ['--no-bool'],
  tft: ['--bool-list', '--no-bool-list', '--bool-list', 'true'],
  '?': ['--help'],
  h: ['--help'],
  H: ['--help'],
  n: ['--num', '125'],
  c: ['--config'],
  l: ['--length'],
  f: ['--file'],
}
var parsed = nopt(types
  , shorthands
  , process.argv
  , 2)

console.log('parsed', parsed)

if (parsed.help) {
  console.log('')
  console.log('nopt cli tester')
  console.log('')
  console.log('types')
  console.log(Object.keys(types).map(function M (t: string) {
    var type = types[t]
    if (Array.isArray(type)) {
      return [t, type.map(function (mappedType: MappedType) {
        return mappedType.name
      })]
    }
    return [t, type && type.name]
  }).reduce(function (s: any, i: any) {
    s[i[0]] = i[1]
    return s
  }, {}))
  console.log('')
  console.log('shorthands')
  console.log(shorthands)
}