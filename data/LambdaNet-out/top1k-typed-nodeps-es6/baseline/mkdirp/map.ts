import { basename } from 'path';
const map: Function = (base: string) =>
  base === 'index.js' ? 'index.js'
  : base === 'cmd.js' ? 'bin/cmd.js'
  : `lib/${base}`
export default (test: string) => map(basename(test));
