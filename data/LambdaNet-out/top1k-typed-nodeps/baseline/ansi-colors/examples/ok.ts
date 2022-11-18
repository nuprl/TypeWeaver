
const log: any[] = require('..');
log.ok = (msg: string) => `${log.green(log.symbols.check)} ${log.bold(msg)}`;
console.log(log.ok('done!'));
