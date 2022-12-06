name: 'levn'
version: '0.4.1'

author: 'George Zahariev <z@georgezahariev.com>'
description: 'Light ECMAScript (JavaScript) Value Notation - human written, concise, typed, flexible'
homepage: 'https://github.com/gkz/levn'
keywords:
  'levn'
  'light'
  'ecmascript'
  'value'
  'notation'
  'json'
  'typed'
  'human'
  'concise'
  'typed'
  'flexible'
files:
  'lib'
  'README.md'
  'LICENSE'
main: './lib/'

bugs: 'https://github.com/gkz/levn/issues'
license: 'MIT'
engines:
  node: '>= 0.8.0'
repository:
  type: 'git'
  url: 'git://github.com/gkz/levn.git'
scripts:
  test: 'make test'

dependencies:
  'prelude-ls': '^1.2.1'
  'type-check': '~0.4.0'

dev-dependencies:
  livescript: '^1.6.0'
  mocha: '^7.1.1'
