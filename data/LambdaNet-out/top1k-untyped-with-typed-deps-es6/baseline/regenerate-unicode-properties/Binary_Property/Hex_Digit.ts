import setFactory from 'regenerate';
const set: Object = setFactory();
set.addRange(0x30, 0x39).addRange(0x41, 0x46).addRange(0x61, 0x66).addRange(0xFF10, 0xFF19).addRange(0xFF21, 0xFF26).addRange(0xFF41, 0xFF46);
export const characters: String = set;
