import setFactory from 'regenerate';
const set = setFactory(0x1805);
set.addRange(0x1802, 0x1803).addRange(0xA840, 0xA877);
export const characters = set;