import setFactory from 'regenerate';
const set: Object = setFactory(0x20, 0x85);
set.addRange(0x9, 0xD).addRange(0x200E, 0x200F).addRange(0x2028, 0x2029);
export const characters: String = set;
