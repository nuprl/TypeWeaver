import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x10C00, 0x10C48);
export const characters: string = set;
