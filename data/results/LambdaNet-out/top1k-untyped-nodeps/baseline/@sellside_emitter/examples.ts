const emitter: Function = require('./');
const obj: Emitter = {};
let n: number = 0;
const log: Function = (msg: string) => console.log(msg, ++n);

emitter(obj);
obj.on('status', log);
obj.on('status', log);
obj.on('status', log);
obj.emit('status', 'I emit!');

console.log(obj);
