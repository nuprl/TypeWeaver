import setFactory from 'regenerate';
const set: object = setFactory(0x60C, 0x61B, 0x61F, 0x640, 0x6D4);
set.addRange(0x10D00, 0x10D27).addRange(0x10D30, 0x10D39);
export const characters: string = set;
