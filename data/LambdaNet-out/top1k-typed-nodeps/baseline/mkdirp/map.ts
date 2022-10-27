const {basename} = require('path')
const map: Function = (base: String) =>
  base === 'index.js' ? 'index.js'
  : base === 'cmd.js' ? 'bin/cmd.js'
  : `lib/${base}`
module.exports = (test: Array) => map(basename(test))
