import setFactory from 'regenerate';
const set = setFactory(0x16FE0);
set.addRange(0x17000, 0x187F7).addRange(0x18800, 0x18AFF).addRange(0x18D00, 0x18D08);
export const characters = set;