import setFactory from 'regenerate';
const set: Object = setFactory();
set.addRange(0x30, 0x39).addRange(0x41, 0x46).addRange(0x61, 0x66);
export const characters: String = set;
