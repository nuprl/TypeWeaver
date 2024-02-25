import { basename } from 'path';
const map = base =>
  base === 'index.js' ? 'index.js'
  : base === 'cmd.js' ? 'bin/cmd.js'
  : `lib/${base}`
export default test => map(basename(test));
