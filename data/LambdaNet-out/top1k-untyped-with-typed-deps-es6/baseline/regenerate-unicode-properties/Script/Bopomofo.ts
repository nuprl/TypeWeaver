import setFactory from 'regenerate';
const set: Object = setFactory();
set.addRange(0x2EA, 0x2EB).addRange(0x3105, 0x312F).addRange(0x31A0, 0x31BF);
export const characters: String = set;