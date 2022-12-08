import setFactory from 'regenerate';
const set = setFactory();
set.addRange(0x11200, 0x11211).addRange(0x11213, 0x1123E);
export const characters = set;
