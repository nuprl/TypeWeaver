import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x11200, 0x11211).addRange(0x11213, 0x1123E);
export const characters: string = set;
