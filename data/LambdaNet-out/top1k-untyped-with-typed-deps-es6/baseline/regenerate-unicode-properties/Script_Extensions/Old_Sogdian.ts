import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x10F00, 0x10F27);
export const characters: string = set;
