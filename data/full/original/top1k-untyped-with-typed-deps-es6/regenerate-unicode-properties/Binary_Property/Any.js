import setFactory from 'regenerate';
const set = setFactory();
set.addRange(0x0, 0x10FFFF);
export const characters = set;
