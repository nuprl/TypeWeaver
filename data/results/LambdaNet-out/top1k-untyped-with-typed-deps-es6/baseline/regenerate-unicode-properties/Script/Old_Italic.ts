import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x10300, 0x10323).addRange(0x1032D, 0x1032F);
export const characters: string = set;
