import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x1E900, 0x1E94B).addRange(0x1E950, 0x1E959).addRange(0x1E95E, 0x1E95F);
export const characters: string = set;
