import setFactory from 'regenerate';
const set: Object = setFactory(0x1F200);
set.addRange(0x3041, 0x3096).addRange(0x309D, 0x309F).addRange(0x1B001, 0x1B11F).addRange(0x1B150, 0x1B152);
export const characters: String = set;
