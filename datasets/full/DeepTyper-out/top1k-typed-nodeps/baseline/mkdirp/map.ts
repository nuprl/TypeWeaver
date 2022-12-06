const {basename} = require('path')
const map: any = (base: string) =>
  base === 'index.js' ? 'index.js'
  : base === 'cmd.js' ? 'bin/cmd.js'
  : `lib/${base}`
module.exports = (test: any) => map(basename(test))
