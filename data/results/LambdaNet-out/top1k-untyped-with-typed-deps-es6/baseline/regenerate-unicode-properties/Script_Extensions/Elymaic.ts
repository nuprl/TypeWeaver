import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x10FE0, 0x10FF6);
export const characters: string = set;
