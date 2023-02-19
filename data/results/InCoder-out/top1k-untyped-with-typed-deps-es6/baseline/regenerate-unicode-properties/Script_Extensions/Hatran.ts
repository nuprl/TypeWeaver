import setFactory from 'regenerate';
const set = setFactory();
set.addRange(0x108E0, 0x108F2).addRange(0x108F4, 0x108F5).addRange(0x108FB, 0x108FF);
export const characters = set;