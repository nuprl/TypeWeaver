import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x2FF2, 0x2FF3);
export const characters: string = set;
