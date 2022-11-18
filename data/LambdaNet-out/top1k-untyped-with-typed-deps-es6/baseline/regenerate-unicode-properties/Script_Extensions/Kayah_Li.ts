import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0xA900, 0xA92F);
export const characters: string = set;
