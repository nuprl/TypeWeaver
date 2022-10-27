import setFactory from 'regenerate';
const set: Object = setFactory(0x61C);
set.addRange(0x200E, 0x200F).addRange(0x202A, 0x202E).addRange(0x2066, 0x2069);
export const characters: String = set;
