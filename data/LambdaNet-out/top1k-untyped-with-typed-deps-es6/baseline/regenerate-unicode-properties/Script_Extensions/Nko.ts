import setFactory from 'regenerate';
const set: object = setFactory(0x60C, 0x61B, 0x61F);
set.addRange(0x7C0, 0x7FA).addRange(0x7FD, 0x7FF).addRange(0xFD3E, 0xFD3F);
export const characters: string = set;
