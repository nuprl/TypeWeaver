import setFactory from 'regenerate';
const set: Object = setFactory(0x180F);
set.addRange(0x180B, 0x180D).addRange(0xFE00, 0xFE0F).addRange(0xE0100, 0xE01EF);
export const characters: String = set;
