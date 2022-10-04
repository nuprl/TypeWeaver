import emitter from './';
const obj: {} = {};
let n: number = 0;
const log: void = (msg: any) => console.log(msg, ++n);

emitter(obj);
obj.on('status', log);
obj.on('status', log);
obj.on('status', log);
obj.emit('status', 'I emit!');

console.log(obj);
