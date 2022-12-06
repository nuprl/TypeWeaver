import setFactory from 'regenerate';
const set = setFactory();
set.addRange(0x10D00, 0x10D27).addRange(0x10D30, 0x10D39);
export const characters = set;
