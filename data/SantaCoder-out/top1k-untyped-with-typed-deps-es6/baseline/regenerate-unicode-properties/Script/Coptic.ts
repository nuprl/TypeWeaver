import setFactory from 'regenerate';
const set = setFactory();
set.addRange(0x3E2, 0x3EF).addRange(0x2C80, 0x2CF3).addRange(0x2CF9, 0x2CFF);
export const characters = set;