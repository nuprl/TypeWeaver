import emitter from './';
const obj: Emitter = {};
let n: Number = 0;
const log: Function = (msg: String) => console.log(msg, ++n);

emitter(obj);
obj.on('status', log);
obj.on('status', log);
obj.on('status', log);
obj.emit('status', 'I emit!');

console.log(obj);
