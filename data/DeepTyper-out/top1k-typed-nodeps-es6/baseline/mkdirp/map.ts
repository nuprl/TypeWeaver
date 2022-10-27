import { basename } from 'path';
const map: any = (base: string) =>
  base === 'index.js' ? 'index.js'
  : base === 'cmd.js' ? 'bin/cmd.js'
  : `lib/${base}`
export default (test: any) => map(basename(test));
