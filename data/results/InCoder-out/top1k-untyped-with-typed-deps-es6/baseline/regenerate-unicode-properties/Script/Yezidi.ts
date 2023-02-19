import setFactory from 'regenerate';
const set = setFactory();
set.addRange(0x10E80, 0x10EA9).addRange(0x10EAB, 0x10EAD).addRange(0x10EB0, 0x10EB1);
export const characters = set;