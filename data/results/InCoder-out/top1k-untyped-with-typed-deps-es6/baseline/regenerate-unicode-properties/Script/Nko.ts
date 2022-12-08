import setFactory from 'regenerate';
const set = setFactory();
set.addRange(0x7C0, 0x7FA).addRange(0x7FD, 0x7FF);
export const characters = set;