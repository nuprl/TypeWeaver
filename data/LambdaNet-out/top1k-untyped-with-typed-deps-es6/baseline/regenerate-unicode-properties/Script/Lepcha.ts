import setFactory from 'regenerate';
const set: Object = setFactory();
set.addRange(0x1C00, 0x1C37).addRange(0x1C3B, 0x1C49).addRange(0x1C4D, 0x1C4F);
export const characters: String = set;
