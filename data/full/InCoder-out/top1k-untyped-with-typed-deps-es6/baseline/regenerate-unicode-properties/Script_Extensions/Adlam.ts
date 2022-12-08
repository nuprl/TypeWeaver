import setFactory from 'regenerate';
const set = setFactory(0x61F, 0x640);
set.addRange(0x1E900, 0x1E94B).addRange(0x1E950, 0x1E959).addRange(0x1E95E, 0x1E95F);
export const characters = set;