import setFactory from 'regenerate';
const set: Object = setFactory();
set.addRange(0x0, 0x10FFFF);
export const characters: String = set;
