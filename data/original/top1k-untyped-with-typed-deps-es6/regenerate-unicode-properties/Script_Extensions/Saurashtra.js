import setFactory from 'regenerate';
const set = setFactory();
set.addRange(0xA880, 0xA8C5).addRange(0xA8CE, 0xA8D9);
export const characters = set;
