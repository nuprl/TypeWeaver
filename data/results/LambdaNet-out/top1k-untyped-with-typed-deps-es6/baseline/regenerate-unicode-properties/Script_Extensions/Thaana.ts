import setFactory from 'regenerate';
const set: object = setFactory(0x60C, 0x61F, 0xFDF2, 0xFDFD);
set.addRange(0x61B, 0x61C).addRange(0x660, 0x669).addRange(0x780, 0x7B1);
export const characters: string = set;
