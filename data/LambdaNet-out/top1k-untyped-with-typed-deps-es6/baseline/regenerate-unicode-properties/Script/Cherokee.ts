import setFactory from 'regenerate';
const set: Object = setFactory();
set.addRange(0x13A0, 0x13F5).addRange(0x13F8, 0x13FD).addRange(0xAB70, 0xABBF);
export const characters: String = set;
