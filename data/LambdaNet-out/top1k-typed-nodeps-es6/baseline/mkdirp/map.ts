import { basename } from 'path';
const map: Function = (base: String) =>
  base === 'index.js' ? 'index.js'
  : base === 'cmd.js' ? 'bin/cmd.js'
  : `lib/${base}`
export default (test: String) => map(basename(test));
