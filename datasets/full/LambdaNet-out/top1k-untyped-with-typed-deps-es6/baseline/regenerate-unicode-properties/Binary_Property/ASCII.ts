import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x0, 0x7F);
export const characters: string = set;
