import setFactory from 'regenerate';
const set: Object = setFactory(0x60C, 0x61B, 0x61F);
set.addRange(0x660, 0x669).addRange(0x10E80, 0x10EA9).addRange(0x10EAB, 0x10EAD).addRange(0x10EB0, 0x10EB1);
export const characters: String = set;
