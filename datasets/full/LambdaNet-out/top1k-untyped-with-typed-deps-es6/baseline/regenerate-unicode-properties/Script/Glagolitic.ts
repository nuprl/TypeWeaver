import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x2C00, 0x2C5F).addRange(0x1E000, 0x1E006).addRange(0x1E008, 0x1E018).addRange(0x1E01B, 0x1E021).addRange(0x1E023, 0x1E024).addRange(0x1E026, 0x1E02A);
export const characters: string = set;
