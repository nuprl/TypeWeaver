import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x200C, 0x200D);
export const characters: string = set;
