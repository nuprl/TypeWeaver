
import log from '..';
log.ok = (msg: String) => `${log.green(log.symbols.check)} ${log.bold(msg)}`;
console.log(log.ok('done!'));
