import setFactory from 'regenerate';
const set: Object = setFactory();
set.addRange(0x16A40, 0x16A5E).addRange(0x16A60, 0x16A69).addRange(0x16A6E, 0x16A6F);
export const characters: String = set;