import setFactory from 'regenerate';
const set = setFactory();
set.addRange(0x800, 0x82D).addRange(0x830, 0x83E);
export const characters = set;