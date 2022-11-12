import setFactory from 'regenerate';
const set: Object = setFactory();
set.addRange(0x1A00, 0x1A1B).addRange(0x1A1E, 0x1A1F);
export const characters: String = set;
