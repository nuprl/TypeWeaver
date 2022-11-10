import setFactory from 'regenerate';
const set = setFactory(0x20, 0xA0, 0x1680, 0x202F, 0x205F, 0x3000);
set.addRange(0x2000, 0x200A);
export const characters = set;