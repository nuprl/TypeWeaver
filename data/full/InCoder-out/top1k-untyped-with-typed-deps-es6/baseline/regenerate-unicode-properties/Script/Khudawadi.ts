import setFactory from 'regenerate';
const set = setFactory();
set.addRange(0x112B0, 0x112EA).addRange(0x112F0, 0x112F9);
export const characters = set;